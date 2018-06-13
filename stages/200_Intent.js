'use strict';

///////////////////////////////////////////////////////////////
////////            stages for message interaction     ///////
///////                      c 2018 xio               ////////
/////////////////////////////////////////////////////////////
const clone =             require('clone-deep')

const { g, b, gr, r, y } = require('../console');

let percent
let message = `I am only ${percent} confident in my reply. Please try again if I misunderstood`

// intent - classify the message based on intent if new interaction

exports.intent = (m) => {
  return new Promise((resolve, reject) => {
    console.log("--------INTENT Stage (watson classifier) ---------")

    if (m.getStatus().isTerminated) {
      return resolve(m) }                    // refactor - reject and text ?

    // test to see if this is active dialogue - no watson call required
    if (!m.getStatus().isNewInteraction) {
      console.log("Active Dialogue Detected - No Watson Call Required")
      return resolve(m) }

    // call watson classifier to analyze message for intent
    // REFACTOR - need handler for error that might thrown by classifyMessage - Watson
    // in case service is lost temporarily
    let obj = m.getWorkObj()

    m.classifyMessage(obj)
      .then((response) => {

        m.setWatsonClassification(response)  // save classifer object

        let threhold = m.getConfidenceThreshold() / 100
        let confidence = m.getWatsonClassification().confidence

        if (confidence < threhold) {        // test confidence against threshold
          percent = confidence
          m.setReply({msg: message})
        }

        m.setMachineState({name: response.top_class})  // save intent as machine name
      //  console.log("============INTENT EXPERIMENT==========")
      //  console.log(m.getWorkObj().machine)
      //  console.log(m.getWorkObj().classifier)

       resolve(m)

      })
    })

  }
