require('dotenv').config()
////////////////////////////////////////////////////////////////
////////              x.io                             ////////
//////            mainline processing                 ///////
//////       c xio 2016 - all rights reserved        ///////
///////////////////////////////////////////////////////////
const q =                  require("inquirer")
const logger =             require("morgan");
const transport =          require('../config/gmail')

const { g, b, gr, r, y } = require('../console');

const app =   express();

//////////////////////////////////////////////////////////////////////////
/////////////    Seed test data if test env detected          ///////////
////////////////////////////////////////////////////////////////////////


let envState = true
if ( process.env.isLive == 'false' ) {
    envState = false
    require('../db/seedTestDb')(envState)
  }

//////////////////////////////////////////////////////////////////////////
////////////////////  Register Middleware       /////////////////////////
////////////////////////////////////////////////////////////////////////
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'));
app.use('/web', express.static('public'));
app.use('/member', express.static('public'));
app.use('/machine', express.static('public'));
app.use('/form', express.static('public'));
app.use(favicon(path.join(__dirname, '..', '/public/assets/favicon.ico')));
app.use(cors())

///////////////////////////////////////////////////////////////////////
/////////////////// messaging alert for platform errors ///////////////
//////////////////////////////////////////////////////////////////////

const mailObject = {
  from: process.env.TRANSPORT_LABEL,
  to: process.env.TRANSPORT_RECEIVER,
  subject: 'Platform Error',
  text: ''
}
process.on('uncaughtException', function (er) {
    console.error(er.stack)
    mailObject.text = er.stack;
    transport.sendMail(mailObject, function (er) {
       if (er) console.error(er)
       process.exit(1)
    })
  })

//////////////////////////////////////////////////////
////////// Register and Config Routes ///////////////
////////////////////////////////////////////////////

const sms =      express.Router();
const db =       express.Router();
const web =      express.Router();
const auth =     express.Router();
const errs =     express.Router();
const unk =      express.Router();
const help =     express.Router();

require('../routes/db')(db);
require('../routes/web')(web);
require('../routes/unk')(unk);
require('../routes/error')(errs);
require('../routes/help')(help);

//////////////////////////////////////////////////////////////////////////
///////////////////////////// API CATALOGUE /////////////////////////////
////////////////////////////////////////////////////////////////////////

// help
app.get('/', help)
// web > twilio > text
app.use('/api/web', web)
// db api
app.use('/api/db', db)
// 404
app.use(unk)
// error handling
app.use(errs)

// server
let port = process.env.PORT || process.env.localport;

app.listen(port, () => {
  console.log(b('listening on port '), port)
});
