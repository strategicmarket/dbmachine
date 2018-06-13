'use strict';

///////////////////////////////////////////////////////////////////////
///////           placeholder for test workitems              ////////
/////////////////////////////////////////////////////////////////////

const workitemObj  =         require('../schemas/Workitem')
const mongoose =             require('mongoose')
const testWorkitems  =       require('../data/workitems')
const { g, b, gr, r, y } =   require('../../console')

const limit = 1;

function getWorkitems (conn) {
      let Workitem = conn.model('Workitem', workitemObj.workitemSchema);
      // always drop the collection and refresh with test data
      Workitem.remove({}, function(e, removed){
        if (e) console.log("Error removing test workitem documents")
        console.log("Test Workitem Docs Removed " + removed.n)
      })

      Workitem.find({}).limit(limit).exec(function (err, collection){
          if (collection.length === 0) {
            // iterate over the set of agents for initialization and create entries
            testWorkitems.map(function(item) {
                let newWorkitem = new Workitem(item)
                newWorkitem.save(function (err, data) {
                  if(err) {
                    console.log(err);
                    return //res.status(500).json({msg: 'internal server error'});
                  }
                })
              })
            console.log(g('Workitems Initialized: ' + conn.name + ' at ' + conn.host))
            return
          }
          else {
            console.log(g('Workitems Exist in db ' + conn.name + ' at ' + conn.host))
          }
        })
      }

module.exports = {
  getWorkitems: getWorkitems
}
