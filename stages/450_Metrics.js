
'use strict';

///////////////////////////////////////////////////////////////
////////            stages for message interaction     ///////
///////                      c 2018 xio               ////////
/////////////////////////////////////////////////////////////

const clone =               require('clone-deep')
const { g, b, gr, r, y } =  require('../console');

// evaluate the confidence level
// create the embedded response object and begin assembling a RESPONSE

exports.metrics = (m) => {
  return new Promise((resolve, reject) => {
    console.log("------ Metrics Stage---------")

    // update meter for count of skills executed -
    // meter microservices consumption for an interaction

    // REFACTOR - save meter information to client.js db

    let newSkill = true
    let updatedMetrics = m.getMeter().map((meter) => {
      if (meter.skill == m.getMachineState()) {
        meter.cnt = meter.cnt + 1
        newSkill = false
      }
    })

    if (newSkill) {
      m.setMeter({skill: m.getMachineState(), cnt: 1})
      resolve(m)
    } else {
      m.updateMeter(updatedMetrics)
      resolve(m)
    }

  })
}
