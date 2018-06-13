
/////////////////////////////////////////////////
//// constructor to instantiate key functions //
///////////////////////////////////////////////


const request =       require('request')

exports.Api = class Api {
    constructor () {
        this.user = { id: 1, name: 'test' }
        this.friends = [ this.user, this.user, this.user ]
        this.agentStore = ["me", "you", "them"]
        this.photo = 'not a real photo'
      }

    getUser () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(this.user)}, 500)
      })
    }

    getAgentConfig (agent) {
      return new Promise((resolve, reject) => {
        resolve(this.searchAgents(agent))
      })
    }

    getFriends (userId) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(this.friends.slice())}, 500)
        })
      }

    getAgentResponse (apiparm) {
      return new Promise((resolve, reject) => {
        /*
        request.get(apiparm, function (error, response, body) {
                  if (error) {
                      console.log(error)
                      reject(error)}
                  resolve(body)
            })
            */
            resolve("working on api agent response")
      })
    }
    searchAgents (agent) {
      return this.agentStore[agent]
    }

    throwError () {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('Intentional Error')), 200)
      })
    }
  }

  /*
  exports.getAgentResponse = (apiparm) => {
       return new Promise((resolve, reject) => {
         request.post(
              apiparm.url,
              { json: apiparm.body },
              function (error, response, body) {
                if (error) {
                    console.log(error)
                    reject(error)}
                resolve(body)
          });
       })
     }

     */
