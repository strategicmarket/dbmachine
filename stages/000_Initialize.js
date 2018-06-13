'use strict';

///////////////////////////////////////////////////////////////
////////            stages for message interaction     ///////
///////                      c 2018 xio               ////////
/////////////////////////////////////////////////////////////

const clone =                 require('clone-deep')
const merge =                 require('deepmerge')
const {createMachine} =       require('@xmachina/message')
//const {createMachine} =       require('../../message') // desktop
const { g, b, gr, r, y } =    require('../console')
const {interactObject} =      require('../db/schemas/Interact')
const {transformSchema} =     require('../utils/transformschema')

let modelObject = {}

// uses interact schema to create a 'modelObject' and initialize the data object
transformSchema(interactObject).then((transformedObject) => {
  modelObject = Object.assign({}, transformedObject)
  modelObject.response.reply = []         // set reply array - messages collected across stages
  modelObject.meter = []                // set meter array - collect stats across stages
})

let i = 0

exports.initialize = (req) => {
  return new Promise((resolve, reject) => {

    console.log("-------------INITIALIZATION Stage-------------")

        if (!req.conn) {
          console.log(r("Conn not live"))
          process.exit(1)
        }

        const m = createMachine()

        console.log("ENTERED MACHINE INITIALIZE")
        console.log(m.getWorkObj().message)
        m.setConnection(req.conn)           // connection

        m.setModelObj(modelObject)         // intialize work object with schema model
        m.setMessage(req.body)            // update workobj with message
        m.setPostdate()                  // timestamp workobj
        m.setCustomer(req.customer)
        m.setConfig(req.config)

        let obj = m.getWorkObj()
        let conn = m.getConnection()

        m.findMember(obj, conn).then((response) => {
          if (response.length) {          // member found for FROM cell number & no db error
            m.setMember(response[0])
          } else{
            // defaults to GUEST
          }
         resolve(m)
        })

      .catch((e) => {
        console.log(r("Initialization Stage Failed"))
        console.log(e)
        reject(e)
      })

  })
}
