'use strict';

///////////////////////////////////////////////////////////////////////
///////           placeholder fo loading agents              ////////
/////////////////////////////////////////////////////////////////////

const partnerObj  =         require('../schemas/Partner')
const mongoose =            require('mongoose')
const testPartners  =       require('../data/partners')
const { g, b, gr, r, y } =  require('../../console')

const limit = 1;

// REFACTOR - SYNC LOAD OF PARTNER TEST WITH MEMBER DATA
// EVERY USE OF THE NETWORK IS A BASIC MEMBER. PARTNER DATA COLLECTED FOR THOSE DOING DEV WORK
function getPartners (conn) {
      let Partner = conn.model('Partner', partnerObj.partnerSchema);
      console.log(g('Partners Initialized: ' + conn.name + ' at ' + conn.host))
      return
      }

module.exports = {
  getPartners: getPartners
}
