require('dotenv').config()

///////////////////////////////////////////////////////////////
////////            stages for message interaction     ///////
///////                      c 2018 xio               ////////
/////////////////////////////////////////////////////////////

const clone =                 require('clone-deep')
const { g, b, gr, r, y } =    require('../console')

const twilioTest = {
  sid: process.env.TWILIO_SID,
  token: process.env.TWILIO_TOKEN,
  API_Secret: process.env.TWILIO_API_SECRET,
  chaotic: process.env.TWILIO_NUMBER
}

exports.config = (m) => {
  return new Promise((resolve, reject) => {

    console.log("-----------CONFIGURATION Stage-------------")
    if (m.getStatus().isTerminated) {
      return resolve(m) }

      // REFACTOR ACTIONs
      // 1. detect invalid configs send text to network owner
      // 2. active dialogue - no config needed (!m.getStatus().isNewInteraction) >> resolve
      // 3. fixes needed to default in web widget ... how do we tie to network owner?

      let config = m.getConfig()

      if (config.twilio.sid && config.twilio.tokenSecret) {
        let client = require('twilio')(config.twilio.sid, config.twilio.API_Secret);
        config.twilio.client = client
        m.setConfig(config)
        resolve(m)
      }
      else {
        let client = require('twilio')(twilioTest.sid, twilioTest.API_Secret);
        config.twilio.client = client
        m.setConfig(config)
        resolve(m)
      }


  })
}
