
'use strict';

///////////////////////////////////////////////////////////////////////
///////////////////      config objects            ////////////////////
//////////////////////////////////////////////////////////////////////

// REFACTOR - USING MONGOOSE POPULATE

const uuidv1 = require('uuid/v1');

const objStore =  [
  {
  	facebook: {
  		clientID: "",
  		clientSecret: "",
  		callbackURL: "",
  		profileFields: ["id", "displayName", "photos"]
  	},
  	twitter: {
  		consumerKey: "",
  		consumerSecret: "",
  		token: "",
  		tokenSecret: "",
  		callbackURL: "",
  		username: "@chaoticbots",
  		profileFields: ["id", "displayName", "photos"]
  	},
  	twilio: {
  		sid: "ACe2f5abf6cf7c589a662a8e38097bbac1",
  		token: "09d6cb826012afbe4f0bca7ad3dfe33d",
  	  API_Secret: "",
  	  username: "",
  		chaotic: ""
  	},
    email: {

    },
    vmail: {

    },
    slack: {

    },
  	redis: {
  		host: "",
  		port: 15416,
  		password: ""
  	},
    watsonclassifier: {
		  description: "Mercy Action v14",
		  url: "https://gateway.watsonplatform.net/natural-language-classifier/api",
		  username: "947a6405-d061-43d7-a696-51daa119c32e",
		  password: "n70l6K7n2Tnt",
		  classifier1: "e997b3x362-nlc-1018"
	   },
  	otherclassifier: {
  		description: "Turing machine classifier V2",
  		url: "https://gateway.watsonplatform.net/natural-language-classifier/api",
  		username: "947a6405-d061-43d7-a696-51daa119c32e",
  		password: "n70l6K7n2Tnt",
  		classifier1: "8426f4x333-nlc-530"
  	},
    runparms: {
    	confidenceLevel: 60,
    	expirationInterval: 2000,
    	agentCallbackThreshold: 25,
    	machineIterationThrehold: 30
    }
  }

]

module.exports = objStore;
