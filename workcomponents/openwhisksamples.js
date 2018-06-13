

//openwhisk code samples

var options = {
  // Paste in the URL of the deployed sample here
  url: '[URL]',
  // Use any name you like...
  body: {'name': 'Susan'},
  headers: {'Content-Type': 'application/json'},
  json: true
};

function owCallback(err, response, body) {
  if (!err && response.statusCode == 200) {
    console.log(response.body.greeting);
  } else {
    console.log('The call failed! ' + err.message);
  }
}

var request = require('request');
request.post(options, owCallback);

////////////////////microplex sample /////////////////////


///////////////////////////////////////////////////////////////
////////            stages for message interaction     ///////
///////                      c 2018 xio               ////////
/////////////////////////////////////////////////////////////
const clone =             require('clone-deep')
const request = 					require('request')
const { Api,
        searchAgents } =	require('../api')
const { getAllAgents,
        getNextAction } =	require('../api')

// intent - identifies intent if required

exports.intent = (obj) => {
  return new Promise((resolve, reject) => {
    console.log("--------INTENT Stage (watson classifier) ---------")
    // natural language classifier - determine next best action based on
    // no context and no direct messaging for a text received
    // and pull the agent from the agent array

    if (obj.state.direct === true ) {
      console.log("intent detected direct")
      obj.state.intent=false            // direct calls detected on earlier stage
      resolve(obj)                     //  so no need to analyze message for intent
      return
    }
    console.log("intent detected")
    obj.state.intent=true

    // call watson classifier to analyze message for intent
    getNextAction(obj, function(error, response) {
      	let agent = searchAgents(response.top_class)
        obj.classifier = clone(response)
        obj.intent = {}
        obj.intent.agent = agent              // default is banter bot

        awaitDirectReplies(obj).then((workobj) => {
          let replyObj = clone(workobj)
          resolve(replyObj)
            }).catch((error) => {
                console.log(error)
                reject(error)
          })
      })
    })
  }

///////////////////////////////////////////////////////
/////       functions to manage workflow           ///
/////  Based on identify intent -- and agent      ///
////      pulse microservice for response        ////
////////////////////////////////////////////////////

// wraps the mainline function to permit .then()

async function awaitDirectReplies(msgObj) {
    const allReplies = await directReplies(msgObj)
    return allReplies
}

// mainline async function
async function directReplies (obj) {
    const api = new Api()

    let apiparm = { url: obj.intent.agent.url,
                    qs: {text: obj.message.Body},
                    headers: { "Content-Type": "application/json" } };

    let response = await api.getAgentResponse(apiparm)
    let parseBody = JSON.parse(response)
    obj.intent.response = clone(parseBody)
    obj.intent.reply = parseBody.reply

    return obj
  }

/////////////////////////


function getWeatherCompanyForecast(geocode) {
  // console.log(geocode);
  const ow = myOpenWhisk();
  const blocking = true;
  const params = { units: 'e', latitude: geocode[0].toString(), longitude: geocode[1].toString() };

  return ow.packages
    .list()
    .then(results => {
      console.log('results: ', results);
      let name;
      // Find the Weather Company Data package and build the action name for forecast.
      for (let i = 0, size = results.length; i < size; i++) {
        const result = results[i];
        console.log(result);
        console.log(result.name);
        if (result.name.startsWith('Bluemix_Weather Company Data')) {
          name = '/' + result.namespace + '/' + result.name + '/forecast';
          break;
        }
      }
      console.log('Using weather from ' + name);
      return name;
    })
    .then(name => {
      return ow.actions.invoke({ name, blocking, params });
    });
}

function actionHandler(args, watsonResponse) {
  console.log('Begin actionHandler');
  console.log(args);
  console.log(watsonResponse);

  return new Promise((resolve, reject) => {
    switch (watsonResponse.output.action) {
      case 'lookupWeather':
        console.log("Calling action 'lookupWeather'");
        return lookupGeocode(args, watsonResponse.output.location)
          .then(geocode => getWeatherCompanyForecast(geocode))
          .then(forecast => {
            // Use the first narrative.
            const narrative = forecast.response.result.forecasts[0].narrative;
            watsonResponse.output.text.push(narrative);
            resolve(watsonResponse);
          });
      /* Other actions could be implemented with this switch or using watsonResponse values.
      case "addMoreActionsHere":
          return resolve(watsonResponse);
      */
      default:
        // No action. Resolve with watsonResponse as-is.
        console.log('No action');
        return resolve(watsonResponse);
    }
  });
}
