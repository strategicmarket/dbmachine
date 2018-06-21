require('dotenv').config()
////////////////////////////////////////////////////////////////
////////              x.io                             ////////
//////            mainline processing                 ///////
//////       c xio 2016 - all rights reserved        ///////
///////////////////////////////////////////////////////////
const q =                  require("inquirer")
const logger =             require("morgan");

const { g, b, gr, r, y } = require('../console');

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
