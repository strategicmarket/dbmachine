'use strict';

///////////////////////////////////////////////////////////////
////////            stages for message interaction     ///////
///////                      c 2018 xio               ////////
/////////////////////////////////////////////////////////////

// execute agent skill - completing the interaction via http, user or system function

const bodyParser =          require('body-parser')
const uuidv1 =              require('uuid/v1');
const errMsg =              require('../config').error()
const {isValidUrl} =        require('../utils')
const { g, b, gr, r, y } =  require('../console');

let err

exports.agent = (m) => {
    return new Promise((resolve, reject) => {
     console.log("-------Call Agent--------")

           if (m.getStatus().isTerminated) {
             return resolve(m) }                    // refactor - reject and text ?

           let obj = m.getWorkObj()
           let api = m.getAgentSkill(obj)         // retrieves the http based on machine state and skills array

           if (!isValidUrl(api)) {
             console.log(r("AGENT STAGE - INVALID HTTP"))
             err = errMsg.e420
             m.setError(err)
             m.setReply({msg: errMsg.e420.description})
             resolve(m)
             return
            }

            // refactor -- note that OW returns an object if an error is encountered
            // {error: "The requested resource does not exist", code: 1814633}
            // {error: "There was an error processing your request", code: 3882864 }
            // use different error types to vary msg and notify support via text

            m.getAgentReply(obj).then((response) => {
              // test for array from microservice otherwise error
              // note openwhisk returns results appended to reply.response property?
              if (response.sender) {
                m.setAgentReply(response)
              //  m.updateWorkObj(response)   ??
                resolve(m)
                return }
              else {
                err = errMsg.e400
                m.setError(err)
                m.setReply({msg: errMsg.e400.description})
                resolve(m)
                }
          })
        })
}
