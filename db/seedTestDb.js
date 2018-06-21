'use strict';

///////////////////////////////////////////////////////////////////////
////////  initialize test data when running in test env //////////////
//////////////////////////////////////////////////////////////////////

const mongoose =            require('mongoose')
const Client =              require('./schemas/Client').Client
const platform =            require('../config').platform()
const utils =               require('../utils')
const testClients =         require('./data/clients')
const initializeAgents =    require('./initialize/getagents')
const initializeMembers =   require('./initialize/getmembers')
const initializeWorkitems = require('./initialize/getworkitems')
const initializeConfigs =   require('./initialize/getconfigs')
const { g, b, gr, r, y } =  require('../console')

let options = {
  poolSize: 10 // Maintain up to 10 socket connections
};


// initializes db and collections for test environment
// platform contains the uri for physical database with test client collection
module.exports = function (dbParms) {
    mongoose.Promise = global.Promise;
    const config = platform.filter((p) => p.isLive == dbParms.envState)

    // if the target environment is the cloud, then uris for the 4 databases need to be set
    // based on custom uris that are passed in the arguments

    if (dbParms.envState == true) {
      config[0].uri = dbParms.platform
    }

    if (utils.isValidUrl(config[0].uri)) {
    console.log("----- ENTERED SEEDTESTDATA----")
    // execute async function
      configObj = { ...config[0], ...dbParms }
      steps(configObj).then((result) => {
        console.log("----- Test Databases Created and Seeded----")
        return
        }).catch((err) => {
          console.log("ERROR - Creating Test Databases")
          console.log(err)
          return
        })
      }
      else {
        console.log("ERROR - Platform JSON Configuration Error Test DB Not Initialized")
        return
      }

    // drop and create test client collection.
    // For every valid client, create test collections on their db
    async function steps(config) {
      let clientArray =    await step1(config)
      let result =         await step2(clientArray)
      return result
    }
}

const step1 = (config) => {
  // drop old test collection for clients and create new test collection
  return new Promise((resolve, reject) => {

    const dbUIR

    // if envState is true, it means we are running on the cloud
    // uri in the client collection needs to be update

    if (config.dbParms.envState == true) {
      dbURI = config.platform + "platform"
      let testClients = testClients.map((t) =>{
        if(t.name=="chaotic") {
          t.uri = config.dbParms.chaotic
          return t
        }
        if(t.name=="machine") {
          t.uri = config.dbParms.machine
          return t
        }
        if(t.name=="chaotic") {
          t.uri = config.dbParms.chaotic
          return t
        }
        return t
      })

    } else {
      dbURI = config.uri + config.db
    }

      mongoose.connect(dbURI)
      let dbc = mongoose.connection

      Client.remove({}, function(e, removed){
        if (e) console.log("Error removing test client documents")
        console.log("Test Client Docs Removed " + removed.n)
      })

      Client.create(testClients, (err, response) => {
        console.log(g('Clients Initialized: ' + dbc.name + ' at ' + dbc.host))
        // return array of new customer objects that were returned from db - used in step2
        dbc.close()
        resolve(response)
      })
  })
}

const step2 = (clientArray) => {
  // intialize a set of test collections for each valid client in the customer db
  return new Promise((resolve, reject) => {
    if (!clientArray) {
      reject(null)
      return
    }

    clientArray.forEach((a) => {
      if (utils.isValidUrl(a.uri)) {
        let conn = mongoose.createConnection(a.uri + a.dbname, options)
        conn.on('error', console.error.bind(console, r('connection error...')));
        conn.once('open', function callback() {
            initializeWorkitems.getWorkitems(conn);
            initializeAgents.getAgents(conn);
            initializeMembers.getMembers(conn);
            initializeConfigs.getConfigs(conn);
          });
       }
       else {
         console.log(y('Caution - invalid platform config: ' + a.name + ' uri = ' + a.uri))
       }
    })
    resolve("success")
  })
}
