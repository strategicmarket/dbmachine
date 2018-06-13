
// a cool design showing main server activity and a bash file to compile

// main server.js   -- note jwt handling

///// bin bash ///////
#!/bin/bash

rm -rf dist && mkdir dist
npx babel src --out-dir dist --ignore node_modules
cp src/package.json dist
cd dist && yarn install --production --modules-folder node_modules

/*
/// docs
#!/bin/bash
Denotes that this is an executable bash file
rm –rf dist && mkdir dist
Removes the /dist directory if it exists (cleanup).
Creates a new /dist directory.
npx babel src —out–dir dist —ignore node_modules
Compiles every file to ES5 and moves the files to the /dist directory, with the exception of node_modules (those are already compiled).
cp src/package.json dist
By design, npx doesn’t migrate json files, so we need to copy it ourselves using the cp command.
cd dist && yarn install —production —modules–folder node_modules
Move into the /dist directory and install the npm modules using yarn

Running the build is as simple as running the following command from your terminal:

"scripts": {
     "build": "./build.sh"
 }
*/


///////////////////////////main server ////////////////////
// import npm modules
import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import winston from 'winston';
import compression from 'compression';
import expressWinston from 'express-winston';
import winstonPapertrail from 'winston-papertrail';
import jwt from 'express-jwt';

// import custom configuration and utilities
import config from './config';
import logger from './utils/logger';

// initialize the api
const api = express();

// initialize middleware
api.use(cors());
api.use(compression());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

// ignore authentication on the following routes
api.use(
        jwt({ secret: config.jwt.secret }).unless({
                path: [
                        '/',
                        '/auth/signup',
                        '/auth/login',
                        '/auth/forgot-password',
                        '/auth/reset-password',
                ],
        }),
);

// throw an error if a jwt is not passed in the request
api.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
                res.status(401).send('Missing authentication credentials.');
        }
});

// initialize our logger (in our case, winston + papertrail)
api.use(
        expressWinston.logger({
                transports: [
                        new winston.transports.Papertrail({
                                host: config.logger.host,
                                port: config.logger.port,
                                level: 'error',
                        }),
                ],
                meta: true,
        }),
);

// listen on the designated port found in the configuration
api.listen(config.server.port, err => {
        if (err) {
                logger.error(err);
                process.exit(1);
        }

// require the database library (which instantiates a connection to mongodb)
        require('./utils/db');

// loop through all routes and dynamically require them – passing api
        fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
                require('./routes/' + file)(api);
        });

// output the status of the api in the terminal
        logger.info(`API is now running on port ${config.server.port} in ${config.env} mode`);
});

module.exports = api;

/////////////////////////////////////////////////////
///////////////////////constroller /////////////////
///////////////////////////////////////////////////

// import npm modules
import async from 'async';
import validator from 'validator';

// import user model
import User from '../models/user';

// import custom utilities
import logger from '../utils/logger';

// retrieve a list of all users
exports.list = (req, res) => {
	const query = req.query || {};

	User.apiQuery(query)
		// limit the information returned (server side) – e.g. no password
		.select('name email username bio url twitter background')
		.then(users => {
			res.json(users);
		})
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});

};

// retrieve a specific user using the user id (in our case, the user from the jwt)
exports.get = (req, res) => {
const data = Object.assign(req.body, { user: req.user.sub }) || {};

	User.findById(data.user)
		.then(user => {
			user.password = undefined;
			user.recoveryCode = undefined;

			res.json(user);
		})
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};

// update a specific user
exports.put = (req, res) => {
	const data = Object.assign(req.body, { user: req.user.sub }) || {};

	if (data.email && !validator.isEmail(data.email)) {
		return res.status(422).send('Invalid email address.');
	}

	if (data.username && !validator.isAlphanumeric(data.username)) {
		return res.status(422).send('Usernames must be alphanumeric.');
	}

	User.findByIdAndUpdate({ _id: data.user }, data, { new: true })
		.then(user => {
			if (!user) {
				return res.sendStatus(404);
			}

			user.password = undefined;
			user.recoveryCode = undefined;

			res.json(user);
		})
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};

// create a user
exports.post = (req, res) => {
	const data = Object.assign({}, req.body, { user: req.user.sub }) || {};

	User.create(data)
		.then(user => {
			res.json(user);
		})
		.catch(err => {
			logger.error(err);
			res.status(500).send(err);
		});
};


// remove a user record (in our case, set the active flag to false to preserve data)
exports.delete = (req, res) => {
	User.findByIdAndUpdate(
		{ _id: req.params.user },
		{ active: false },
		{
			new: true,
		},
	)
		.then(user => {
			if (!user) {
				return res.sendStatus(404);
			}

			res.sendStatus(204);
		})
		.catch(err => {
			logger.error(err);
			res.status(422).send(err.errors);
		});
};



////////////////////////////////////////////
///////////// mongoose ////////////////////
///////////////////////////////////////////

// import npm modules
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'mongoose-bcrypt';
import timestamps from 'mongoose-timestamp';
import mongooseStringQuery from 'mongoose-string-query';


// import custom utilities
import logger from '../utils/logger';
import email from '../utils/email';
import events from '../utils/events';

// build user schema
export const UserSchema = new Schema(
        {
                email: {
                        type: String,
                        lowercase: true,
                        trim: true,
                        index: true,
                        unique: true,
                        required: true,
                },
                username: {
                        type: String,
                        lowercase: true,
                        trim: true,
                        index: true,
                        unique: true,
                        required: true,
                },
                password: {
                        type: String,
                        required: true,
                        bcrypt: true,
                },
                name: {
                        type: String,
                        trim: true,
                        required: true,
                },
                bio: {
                        type: String,
                        trim: true,
                        default: '',
                },
                url: {
                        type: String,
                        trim: true,
                        default: '',
                },
                twitter: {
                        type: String,
                        trim: true,
                        default: '',
                },
                background: {
                        type: Number,
                        default: 1,
                },
                interests: {
                        type: Schema.Types.Mixed,
                        default: [],
                },
                preferences: {
                        notifications: {
                                daily: {
                                        type: Boolean,
                                        default: false,
                                },
                                weekly: {
                                        type: Boolean,
                                        default: true,
                                },
                                follows: {
                                        type: Boolean,
                                        default: true,
                                },
                        },
                },
                recoveryCode: {
                        type: String,
                        trim: true,
                        default: '',
                },
                active: {
                        type: Boolean,
                        default: true,
                },
                admin: {
                        type: Boolean,
                        default: false,
                },
        },
        { collection: 'users' },
);


// pre-save hook that sends welcome email via custom email utility
UserSchema.pre('save', function(next) {
        if (!this.isNew) {
                next();
        }

        email({
                type: 'welcome',
                email: this.email,
        })
                .then(() => {
                        next();
                })
                .catch(err => {
                        logger.error(err);
                        next();
                });
});


// pre-save hook that sends password recovery email via custom email utility
UserSchema.pre('findOneAndUpdate', function(next) {
        if (!this._update.recoveryCode) {
                return next();
        }

        email({
                type: 'password',
                email: this._conditions.email,
                passcode: this._update.recoveryCode,
        })
                .then(() => {
                        next();
                })
                .catch(err => {
                        logger.error(err);
                        next();
                });
});


// require plugins
UserSchema.plugin(bcrypt); // automatically bcrypts passwords
UserSchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps
UserSchema.plugin(mongooseStringQuery); // enables query capabilities (e.g. ?foo=bar)

UserSchema.index({ email: 1, username: 1 }); // compound index on email + username

module.exports = exports = mongoose.model('User', UserSchema); // export model for use



///////////////////////////////////
//////////personalization api ////
//////////////////////////////////

// import npm modules
import axios from 'axios';
import jwt from 'jsonwebtoken';

// import custom utilities
import config from '../../config';

const personalization = data => {
	// setup promise
	return new Promise((resolve, reject) => {

		// build jwt for signing the API call
		const token = jwt.sign(
			{
				action: '*',
				feed_id: '*',
				resource: '*',
				user_id: '*',
			},
			config.stream.apiSecret,
			{ algorithm: 'HS256', noTimestamp: true },
		);

// initiate call via axios (http module)
		return axios({
			baseURL: config.stream.baseUrl,
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
				'Stream-Auth-Type': 'jwt',
			},
			method: 'GET',
			params: {
				api_key: config.stream.apiKey,
				user_id: data.userId,
			},
			url: data.endpoint,
		})
			.then(res => {
				// map over results and deserialize
				const data = res.data.results.map(result => {
					return result.foreign_id.split(':')[1];
				});
				// successfully resolve call and return deserialized data
				resolve(data);
			})
			.catch(err => {
				// catch and reject with error
				reject(err);
			});
	});
};

export default personalization;

/////////////////////////////////
/////////////execute api ///////
///////////////////////////////
personalization({
    endpoint: '/user_recommendations',
    userId: req.user.sub, // id is extracted from the jwt
})
.then(users => {
    // iterate over users and enrich
    users.map(user => {
        // do something with the user data
    });
})
.catch(err => {
    res.status(503).send(err.response.data);
});
