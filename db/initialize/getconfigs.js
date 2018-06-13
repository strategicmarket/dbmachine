'use strict';

//////////////////////////////////////////////////////////
///////           test configurations            ////////
////////////////////////////////////////////////////////

const configObj  =          require('../schemas/Config')
const mongoose =            require('mongoose')
const testConfigs  =         require('../data/configs')
const { g, b, gr, r, y } =  require('../../console')

const limit = 1;

function getConfigs (conn) {
    let Config = conn.model('Config', configObj.configSchema);
      // always drop the collection and refresh with test data
    Config.remove({}, function(e, removed){
        if (e) console.log("Error removing test config documents")
        console.log("Test Config Docs Removed " + removed.n)
      })

      Config.find({}).limit(limit).exec(function (err, collection){
          if (collection.length === 0) {
            // iterate over the set of agents for initialization and create entries
            testConfigs.map(function(config) {
                let newConfig = new Config(config)
                newConfig.save(function (err, data) {
                  if(err) {
                    console.log(err);
                    return //res.status(500).json({msg: 'internal server error'});
                  }
                })
              })
            console.log(g('Configs Initialized: ' + conn.name + ' at ' + conn.host))
            return
          }
          else {
            console.log(g('Configs Exist in db ' + conn.name + ' at ' + conn.host))
          }
        })
      }

module.exports = {
  getConfigs: getConfigs
}
