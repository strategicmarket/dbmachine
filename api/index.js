

//////////////////////////////////////////////////////
//////  api wrapppers to db functions and sdks //////
////////////////////////////////////////////////////

const clone =           require('clone-deep')
const uuidv1 =          require('uuid/v1')
const ClassifierV1 =    require('watson-developer-cloud/natural-language-classifier/v1')
//const db =              require('./db')
//const http =            require('./http')
//const config =          require('../config').init()
/*
const classifier = new ClassifierV1({
  username: config.watsonclassifier.username,
  password: config.watsonclassifier.password
});

//////////////////////////////////////////////////////
//////          Watson SDK                     //////
////////////////////////////////////////////////////
  // REFACTOR - test for failed conditions - unable to retrieve classifier
  exports.getNextAction = (obj, cb) => {
    const token = obj.message.token

    classifier.classify({
      text: obj.message.Body,
      classifier_id: config.watsonclassifier.classifier1 },
      function(err, response) {
        if (err) return cb(err)
          return cb(null, response)
        });
      }
*/
//////////////////////////////////////////////////////
/////                INTERACTIONS             ///////
////////////////////////////////////////////////////

      exports.findLastInteraction = (obj, conn, cb) => {

        // the db service was initialzed with the uri for the organization
        thread(obj, conn).then((result) => {
          cb(result)
        }).catch((err) => {
          console.log("ERROR IN Find Interaction PROCESSING")
          console.log(err)
        })

        async function thread(obj) {
          let result = await db.findLastInteraction(obj, conn)
          return result
        }

      }

      // finds the last interaction that has not expired based on elapse time parm
      exports.findUnexpiredInteraction = (obj, conn, cb) => {

        // the db service was initialzed with the uri for the organization
        // retrieve last interaction, then test against config expiration parm
        thread(obj, conn).then((result) => {

          if (result == null) return cb(null) // no interaction found

          let start = Date.parse(result.postdate)         // time of last Interaction
          let timeInterval = (Date.now() - start) - (config.expirationInterval * 1000)   // test for remaining time
          console.log( "Last Interaction Posted at  = " + start )
          console.log(" Current time is " + Date.now() )
          let lapseTime = Date.now() - start
          let lapseInterval = config.expirationInterval * 1000
          let lapseTest = lapseTime - lapseInterval
          console.log("MATH -- total lapse time = " + lapseTime )
          console.log("MATH -- total lapse interval = " + lapseInterval )
          console.log("MATH -- new calc = " + lapseTest )
          console.log( "Time interval = " + timeInterval )

          if (timeInterval > 0) {
            return cb(null)   // time expired
          } else {
            cb(result)   // return unexpired interaction
          }

        }).catch((err) => {
          console.log("ERROR IN Find Interaction PROCESSING")
          console.log(err)
        })

        async function thread(obj, conn) {
          let result = await db.findLastInteraction(obj, conn)
          return result
        }

      }

      // save the completed interaction -- conn is the db end point for the organization
      exports.saveInteraction = (obj, conn, cb) => {

        thread(obj, conn).then((result) => {
          cb(result)
        }).catch((err) => {
          console.log("ERROR IN Save Interaction PROCESSING")
          console.log(err)
        })
        // async await function to drive synchronous processing of db update
        async function thread(obj, conn) {
          let result = await db.saveInt(obj, conn)
          return result
        }
      }
//

//////////////////////////////////////////////////////
/////                   AGENTS                ///////
////////////////////////////////////////////////////

      // retrieve agent configurations from mongo
      // REFACTOR -- no agent found for the machine that was identified via intent
      exports.findAgent = (obj, conn, cb) => {

        thread(obj, conn).then((result) => {
          cb(result)
        }).catch((err) => {
          console.log("ERROR IN Find Agent Interaction PROCESSING")
          console.log(err)
        })

        async function thread(obj, conn) {
          let result = await db.findAgent(obj, conn)
          return result
        }
      }

      // execute http microservice
      // multitenant design is db separation. Correct agent collection accessed based
      // on db ui selected from configuration
      // entire interact obj sent to microservice -- information rich object

      exports.getAgentReply = (obj, cb) => {

        reply(obj).then((result) => {
          cb(result)
        }).catch((err) => {
          console.log("ERROR IN Get Agent Reply Interaction PROCESSING")
          console.log(err)
        })

        async function reply(obj) {
          let i = obj.machine.thisSlot
          let apiparm = { url: obj.agent.skills[i].skillsource,
                          body: obj,
                          headers: { "Content-Type": "application/json" } };

          let response = await http.getAgentResponse(apiparm)
          return response
      }
    }

    // get all records in agent collections
    exports.getAgents = (token, conn, cb) => {

        thread(conn).then((result) => {
          cb(result)
        }).catch((err) => {
          console.log("ERROR IN Get Agent PROCESSING")
          console.log(err)
        })

        async function thread(conn) {
          let result = await db.getAgent(conn)
          return result
        }
      }

    // update agent record
    exports.updateAgent = (token, contact, conn, cb) => {
      thread(contact, conn).then((arr) => {
        cb(arr)
      }).catch((err) => {
        console.log("ERROR IN Update Agent PROCESSING")
        console.log(err)
      })

      async function thread(contact, conn) {
        let result = await db.updateAgent(contact, conn)
        return result
      }
    }

    // add agent record
    const addAgent = (token, contact, conn, cb) => {

      thread(contact, conn).then((result) => {
        cb(result)
      }).catch((err) => {
        console.log("ERROR IN Add Agent PROCESSING")
        console.log(err)
      })
      async function thread(contact, conn) {
        let result = await db.putAgent(contact, conn)
        return result
      }
    }

    // delete agent record
    const deleteAgent = (token, id, conn, cb) => {
      thread(id, conn).then((result) => {
        cb(result)
      }).catch((err) => {
        console.log("ERROR IN DELETE Agent PROCESSING")
        console.log(err)
      })
      async function thread(id, conn) {
        let result = await db.deleteAgent(id, conn)
        return result
      }
    }

//////////////////////////////////////////////////////
/////                 CLIENTS                 ///////
////////////////////////////////////////////////////
      exports.getClients = (token, conn, cb) => {

        thread(conn).then((result) => {
          cb(result)
        }).catch((err) => {
          console.log("ERROR IN GET Client PROCESSING")
          console.log(err)
        })
        async function thread(conn) {
          let result = await db.getClients(conn)
          return result
        }
      }

      exports.addClient = (token, contact, conn, cb) => {
        contact.id = uuidv1()

        thread(contact, conn).then((result) => {
          cb(result)
        }).catch((err) => {
          console.log("ERROR IN Add Client PROCESSING")
          console.log(err)
        })
        // async await function to drive synchronous processing of db update
        async function thread(contact, conn) {
          let result = await db.putClient(contact, conn)
          return result
        }
      }

      exports.updateClient = (token, contact, conn, cb) => {

        thread(contact, conn).then((profileArray) => {
          cb(profileArray)
        }).catch((err) => {
          console.log("ERROR IN updateProfile PROCESSING")
          console.log(err)
        })
        async function thread(contact, conn) {
          let result = await db.updateClient(contact, conn)
          return result
        }
      }

      exports.deleteClient = (token, id, conn, cb) => {

        thread(id, conn).then((result) => {
          cb(result)
        }).catch((err) => {
          console.log("ERROR IN DELETE Client PROCESSING")
          console.log(err)
        })
        async function thread(id, conn) {
          let result = await db.deleteClient(id, conn)
          return result
        }
      }
//

//////////////////////////////////////////////////////
/////                Members                 ///////
////////////////////////////////////////////////////
      exports.findMember = (obj, conn, cb) => {

        thread(obj, conn).then((result) => {
          cb(result)
        }).catch((err) => {
          console.log("ERROR IN GET Member PROCESSING")
          console.log(err)
        })
        async function thread(obj, conn) {
          let result = await db.findMember(obj, conn)
          return result
        }
      }

      exports.addMember = (token, contact, conn, cb) => {
        contact.id = uuidv1()

        thread(contact, conn).then((result) => {
          cb(result)
        }).catch((err) => {
          console.log("ERROR IN Add Member PROCESSING")
          console.log(err)
        })
        // async await function to drive synchronous processing of db update
        async function thread(contact, conn) {
          let result = await db.putMember(contact, conn)
          return result
        }
      }

      exports.updateMember = (token, contact, conn, cb) => {

        thread(contact, conn).then((profileArray) => {
          cb(profileArray)
        }).catch((err) => {
          console.log("ERROR IN Member Update PROCESSING")
          console.log(err)
        })
        async function thread(contact, conn) {
          let result = await db.updateMember(contact, conn)
          return result
        }
      }

      exports.deleteMember = (token, id, conn, cb) => {

        thread(id, conn).then((result) => {
          cb(result)
        }).catch((err) => {
          console.log("ERROR IN DELETE Member PROCESSING")
          console.log(err)
        })
        async function thread(id, conn) {
          let result = await db.deleteMember(id, conn)
          return result
        }
      }
