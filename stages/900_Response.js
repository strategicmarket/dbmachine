require('dotenv').config()
///////////////////////////////////////////////////////////////
////////            stages for message interaction     ///////
///////                      c 2018 xio               ////////
/////////////////////////////////////////////////////////////

const bodyParser =          require('body-parser')
const clone =               require('clone-deep')
const { g, b, gr, r, y } =  require('../console');

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

let webArr = []
let webMsg = {
  message: null,
  link: null
}
// response - send

exports.response = (m, res) => {
  return new Promise((resolve, reject) => {
    console.log("---------RESPONSE Stage---------")


    // REFACTOR -- insert tests to ensure response.reply is data type json
    if (m.getWorkObj().message.ChaoticSource == 'web') {

      if(m.getWorkObj().response.reply.length > 0) {

        console.log(r('--------debug response-------------'))
        console.log(m.getWorkObj().status)
        console.log(m.getWorkObj().response.reply)
        console.log(r("-------------------------------------"))

        res.status(200)
        res.json(m.getWorkObj().response.reply)
      } else {
        webMsg.message = "hmmmm - Like a 404. The agent never responded"
        res.status(200)
        webArr.push(webMsg)
        res.json(webArr)
      }
      webMsg.message = null
      webMsg.link = null
      webArr = []
      resolve(m)
      return
    }
    /////////////////////// sms response ///////////////////////

    let messageObj =  textConfig
    messageObj.to =   m.getWorkObj().message.From
    messageObj.from = m.getWorkObj().message.To
    let client = m.getWorkObj().config.twilio.client

    console.log("DEBUG --------------------------------")
    console.log(m.getWorkObj().config.twilio)

    // function to recursively execute the response.reply queue
    // REFACTOR -- if there is a media object attached -- send an mms to twilio
    // otherwise send text sms

    const processItems = (x) => {
        if ( x < m.getWorkObj().response.reply.length ) {
          let replyKey = Object.keys(m.getWorkObj().response.reply[x])[0]
          let replyMessage = m.getWorkObj().response.reply[x][replyKey]
          messageObj.body = replyMessage
          client.messages.create(messageObj)
                           .then((message) => console.log(message.sid))
          processItems(x+1);
       }
     }

    //start executing recursive function
    processItems(0);

    res.writeHead(200, {'Content-type': 'text/xml'});
    res.end()
    resolve(m)

  })
}
