require('dotenv').config()

//////////////////////////////////////////////////////
////////      process web http message        ///////
////////////////////////////////////////////////////

const bodyParser =  			require('body-parser')


const twilioTest = {
  sid: process.env.TWILIO_SID,
  token: process.env.TWILIO_TOKEN,
  tokenSecret: process.env.TOKENSECRET,
  username: process.env.TWILIO_TESTUSER,
  chaotic: process.env.TWILIO_NUMBER
}

const mediaConfig = {
    to: process.env.TWILIO_TESTUSER,
    from: process.env.TWILIO_NUMBER,
    body: "default",
    mediaUrl: process.env.TWILIO_TESTMEDIA
  }
const textConfig = {
    to: process.env.TWILIO_TESTUSER,
    from: process.env.TWILIO_NUMBER,
    body: "more default"
  }

const web = (router) => {

	router.use(bodyParser.json());
	router.use(function(req, res, next) {

	console.log("-------------INCOMING WEB MESSAGE -----------")

  var client = require('twilio')(twilioTest.sid, twilioTest.tokenSecret);
	client.sendMessage({
				to: twilioTest.username,   // REFACTOR to point to interact object or req. object
				from: twilioTest.chaotic,
				body: req.body.Body
			   }, function (err, responseData) {
				       if (!err) {
               console.log("sent message " + responseData.body + " from " + responseData.from)
					     //res.json({"From": responseData.from, "Body": responseData.body});
				}
		  });
      res.status(200)
      res.json({message: req.body.Body})
    next()
 });
}

module.exports = web
