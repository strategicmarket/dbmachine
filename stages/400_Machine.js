'use strict';

///////////////////////////////////////////////////////////////
////////            stages for message interaction     ///////
///////                      c 2018 xio               ////////
/////////////////////////////////////////////////////////////

// this models finite state machine

const bodyParser =          require('body-parser')
const uuidv1 =              require('uuid/v1');
const clone =               require('clone-deep')
const errMsg =              require('../config').error()
const { g, b, gr, r, y } =  require('../console');

let newObj = {}
let newresponseObj = {}
let err

let message = "Sorry! I was momentarily distracted. Please try again"

exports.machine = (m) => {
    return new Promise((resolve, reject) => {
     console.log("----------MACHINE Stage ------------")

     if (m.getStatus().isTerminated) {
       return resolve(m) }                    // refactor - reject and text ?

     // test to see if this is active dialogue - no watson call required
     if (!m.getStatus().isNewInteraction) {
       console.log("Active Dialogue Detected - No Watson Call Required")
       return resolve(m) }

    // new interaction. Find agent that matches classifier from intent stage
       let obj = m.getWorkObj()
       let conn = m.getConnection()

       m.findAgent(obj, conn)
         .then((agent) => {
           if (agent) {

             // REFACTOR - SEND TEXT TO ADMIN

             if (agent.length == 0) {
               console.log(r(message))
               m.setReply({msg: message})
               err = errMsg.e200
               m.setAgent({name: "No Agent Matching Intent (e200)"})
               m.setError(err)
               resolve(m)
               return
             }
               console.log("FOUND AGENT MATCHING INTENT")

               m.setAgent(agent[0])     // update for agent
               m.setMachineState({thisSlot: 0})
               m.setMachineState({thisState: agent[0].skills[0].skillname })

            //   console.log("============MACHINE EXPERIMENT==========")
            //   console.log(m.getWorkObj().machine)
            //   console.log(m.getWorkObj().agent)
               resolve(m)

            } else {
               // error - no agent found for intent
               console.log(r("MACHINE STAGE - AGENT NOT FOUND"))
               err = errMsg.e300
               m.setAgent({name: "No Agent Matching Intent (e300)"})
               m.setError(err)
               m.setReply({msg: errMsg.e300.description})
               resolve(m)
            }
         })
      })
    }
