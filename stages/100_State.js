'use strict';

///////////////////////////////////////////////////////////////
////////            stages for message interaction     ///////
///////                      c 2018 xio               ////////
/////////////////////////////////////////////////////////////

const uuidv1 =                          require('uuid/v1')
const clone =                           require('clone-deep')
const { g, b, gr, r, y } =              require('../console')
const errMsg =                          require('../config').error()

let newObj = {}
let newresponseObj = {}

exports.state = (m) => {
  return new Promise((resolve, reject) => {

    console.log("-------------STATE Stage-------------")


    //////////////////////////////////////////////////////////////////////////
    // determine the state of the interaction and set key variables /////////
    /////////////////////////////////////////////////////////////////////////

    // REFACTOR m.plugIns()
    // new feature - execute system plugins for acceptable use, email, notifications
    let obj = m.getWorkObj()
    let conn = m.getConnection()

    m.findLastInteraction(obj, conn)
      .then((last) => {

        m.setContext(last)
        .then((status) => {

          console.log(b("--------------state status--------------"))
          console.log(status)

          if (status.isTerminated) {
            return resolve(m) }                    // refactor - reject and text ?
          if (status.isNewInteraction) {
            return resolve(m) }

          // active dialogue
          m.setAgent(last.agent)
          m.updateMeter(last.meter)
          m.incrementDialogue(last)               // capture id of last interaction and increment
          m.updateMachineState(last)              // progress state for the Machine

          console.log(r("THE EXPERIMENT CONTINUES"))
          //console.log(m.getWorkObj())

          resolve(m)

        })
      })
    })
}
