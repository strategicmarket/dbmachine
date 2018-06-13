'use strict';

///////////////////////////////////////////////////////////////////////
///////           placeholder for laoding members             ////////
/////////////////////////////////////////////////////////////////////

const memberObj  =          require('../schemas/Member')
const mongoose =            require('mongoose')
const testMembers  =        require('../data/members')
const { g, b, gr, r, y } =  require('../../console')

const limit = 1;

function getMembers (conn) {
      let Member = conn.model('Member', memberObj.memberSchema);
      // always drop the collection and refresh with test data
      Member.remove({}, function(e, removed){
        if (e) console.log("Error removing test member documents")
        console.log("Test Member Docs Removed " + removed.n)
      })

      Member.find({}).limit(limit).exec(function (err, collection){
          if (collection.length === 0) {
            // iterate over the set of agents for initialization and create entries
            testMembers.map(function(member) {
                let newMember = new Member(member)
                newMember.save(function (err, data) {
                  if(err) {
                    console.log(err);
                    return //res.status(500).json({msg: 'internal server error'});
                  }
                })
              })
            console.log(g('Members Initialized: ' + conn.name + ' at ' + conn.host))
            return
          }
          else {
            console.log(g('Members Exist in db ' + conn.name + ' at ' + conn.host))
          }
        })
      }

module.exports = {
  getMembers: getMembers
}
