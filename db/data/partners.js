
'use strict';

///////////////////////////////////////////////////////////////////////
///////////////////      partner test db          ////////////////////
//////////////////////////////////////////////////////////////////////

// REFACTOR - USING MONGOOSE POPULATE

const uuidv1 = require('uuid/v1');

const objStore =  [
  {
  	"org": {
  		"name": "Strategic Machines",
  		"addr1": "100 Main Street",
  		"addr2": "Suite 100",
  		"city": "Charlotte",
  		"state": "NC",
  		"zip": "28211",
  		"url": "www.strategicmachines.io",
  		"contact": "ChaoticBot",
  		"phone": "+19145005391"
  	},
  	"db": {
  		"username": "xio",
  		"password": "Charl0tte",
  		"host": "ds153352.mlab.com",
  		"port": "53352",
  		"name": "sessionio",
  		"uri": "mongodb://xio:Charl0tte@ds019936.mlab.com:19936/chaoticbots"
  	},
  	"sessionSecret": "superhards3cr3t",
  	"facebook": {
  		"clientID": "309077476219184",
  		"clientSecret": "21f9ea80ef5bd0d517062fd50cc932a3",
  		"callbackURL": "/auth/facebook/callback",
  		"profileFields": ["id", "displayName", "photos"]
  	},
  	"twitter": {
  		"consumerKey": "JA4BIib9jLsunB6LimJBBMxfj",
  		"consumerSecret": "uS2BN9IV9lKmdsRHZu3ta2B8Xl0PpxeQNj8BYhFfjevyTCrC7G",
  		"token": "3014822554-LL4oDX0uFrDfyTlKP7US4oS11zdUqsgfZ2eEejD",
  		"tokenSecret": "wvOR0cEg6RQOTlPfQLJRxFKUbNyr9WeA7dJFZ3pwLfqdU",
  		"callbackURL": "/auth/twitter/callback",
  		"username": "@chaoticbots",
  		"profileFields": ["id", "displayName", "photos"]
  	},
  	"twilio": {
  		"sid": "ACe2f5abf6cf7c589a662a8e38097bbac1",
  		"token": "ACe2f5abf6cf7c589a662a8e38097bbac1",
  	  "tokenSecret": "09d6cb826012afbe4f0bca7ad3dfe33d",
  	  "username": "+19145005391",
  		"chaotic": "+19802294921"
  	},
  	"redis": {
  		"host": "redis-15416.c12.us-east-1-4.ec2.cloud.redislabs.com",
  		"port": 15416,
  		"password": "nashv1ll"
  	},
  	"chaoticsms": {
  		"host": "http://localhost",
  		"port": "3000",
  		"url": "http://localhost:3000"
  	},
  	"watsonclassifier": {
  		"description": "Turing machine classifier V2",
  		"url": "https://gateway.watsonplatform.net/natural-language-classifier/api",
  		"username": "947a6405-d061-43d7-a696-51daa119c32e",
  		"password": "n70l6K7n2Tnt",
  		"classifier1": "8426f4x333-nlc-530"
  	},
  	"testdb": {
  		"url": "http://localhost:5002/api/agent",
  		"uri": "mongodb://localhost:27017/chaoticbots"
  	},
  	"port": 3000,
  	"token": "secret",
  	"confidenceLevel": 60,
  	"expirationInterval": 1200,
  	"agentCallbackThreshold": 8,
  	"machineIterationThrehold": 20
  }

]

module.exports = objStore;
