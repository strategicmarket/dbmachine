

///////////////////////////////////////////////////////////////
/////////////    channel and path processing       ///////////
/////////////////////////////////////////////////////////////

// http test endpoint api/db - renders test data
// set of channels which are or will supported by the platform

module.exports = () => {

  switch(req.url) {
    case '/db/agent':
    case '/db/client':
      const token = req.get('Authorization')
      if (token) {
        req.token = token }
      else {
        req.token = keys.token   // assign temp token
        }

      if (!req.body) {
        req.body = {}
        }
      req.body.To = "+19148195104"       // assign test client strategic machines
      req.body.ChaoticSource = "web"
      req.body.Token = "secret"
    default:
  }


  switch(req.body.ChaoticSource) {
    case 'web':
        console.log('Message Source is Web')
        break;
    case 'sms':
        console.log('Message Source is SMS')
        break;
    case 'twt':
        console.log('Message Source is Twitter')
        break;
    case 'fbk':
        console.log('Message Source is Facebook')
        break;
    case 'tel':
        console.log('Message Source is Telegram')
        break;
    case 'wat':
        console.log('Message Source is WhatsApp')
        break;
    case 'slk':
        console.log('Message Source is Slack')
        break;
    case 'vbr':
        console.log('Message Source is Viber')
        break;
    case 'kik':
        console.log('Message Source is Kik')
        break;
    case 'lne':
        console.log('Message Source is Line')
        break;
    case 'snp':
        console.log('Message Source is SnapChat')
        break;
    case 'wec':
        console.log('Message Source is WeChat')
        break;
    case 'qq':
        console.log('Message Source is QQ')
        break;
    default:
        console.log('Message Source Not Detected - Assume Twilio')
        req.body.ChaoticSource = "sms"
  }
}
