'use strict';

///////////////////////////////////////////////////////////////////////
///////           placeholder for loading agents              ////////
/////////////////////////////////////////////////////////////////////

const agentObj  =           require('../schemas/Agent')
const mongoose =            require('mongoose')
const testAgents  =         require('../data/agents')
const { g, b, gr, r, y } =  require('../../console')

const limit = 1;

function getAgents (conn) {
      let Agent = conn.model('Agent', agentObj.agentSchema);
      // always drop the collection and refresh with test data
      Agent.remove({}, function(e, removed){
        if (e) console.log("Error removing test agent documents")
        console.log("Test Agent Docs Removed " + removed.n)
      })

      Agent.find({}).limit(limit).exec(function (err, collection){
          if (collection.length === 0) {
            // iterate over the set of agents for initialization and create entries
            testAgents.map(function(agent) {
                let newAgent = new Agent(agent)
                newAgent.save(function (err, data) {
                  if(err) {
                    console.log(err);
                    return //res.status(500).json({msg: 'internal server error'});
                  }
                })
              })
            console.log(g('Agents Initialized: ' + conn.name + ' at ' + conn.host))
            return
          }
          else {
            console.log(g('Agents Exist in db ' + conn.name + ' at ' + conn.host))
          }
        })
      }

module.exports = {
  getAgents: getAgents
}
