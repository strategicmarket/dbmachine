// repository.js
'use strict'
///////////////////////////////////////////////////////////////////
//// constructor to instantiate key functions for microservices //
/////////////////////////////////////////////////////////////////
const db =              require('../api/db')

// factory function, that holds an open connection to the db,
// and exposes some functions for accessing the data.
const repository = (conn, obj) => {

  // since this is the platform service, we already know
  // that we are going to query the `movies` collection
  // in all of our functions.
//  const collection = db.collection('Member')

  let workObj = {}


  //////////////////////////////////////////////////////
  /////                Members                 ///////
  ////////////////////////////////////////////////////
  const findMember = (conn, obj) => {
    console.log("Entered findMember")
    return new Promise((resolve, reject) => {
      resolve(db.findMember(obj, conn))

      })
    }

  const getMoviePremiers = () => {
    return new Promise((resolve, reject) => {
      const movies = []
      const currentDay = new Date()
      const query = {
        releaseYear: {
          $gt: currentDay.getFullYear() - 1,
          $lte: currentDay.getFullYear()
        },
        releaseMonth: {
          $gte: currentDay.getMonth() + 1,
          $lte: currentDay.getMonth() + 2
        },
        releaseDay: {
          $lte: currentDay.getDate()
        }
      }
      const cursor = collection.find(query)
      const addMovie = (movie) => {
        movies.push(movie)
      }
      const sendMovies = (err) => {
        if (err) {
          reject(new Error('An error occured fetching all movies, err:' + err))
        }
        resolve(movies)
      }
      cursor.forEach(addMovie, sendMovies)
    })
  }

  const getMovieById = (id) => {
    return new Promise((resolve, reject) => {
      const projection = { _id: 0, id: 1, title: 1, format: 1 }
      const sendMovie = (err, movie) => {
        if (err) {
          reject(new Error(`An error occured fetching a movie with id: ${id}, err: ${err}`))
        }
        resolve(movie)
      }
      // fetch a movie by id -- mongodb syntax
      collection.findOne({id: id}, projection, sendMovie)
    })
  }

  // this will close the database connection
  const disconnect = () => {
    console.log("Did This Really Close ??")
    conn.close()
  }

  //  getAllMovies,
  //  getMoviePremiers,
  //  getMovieById,
  //  findMember,
  //  disconnect

  return Object.create({
    workObj,
    findMember,
    disconnect})
  }

const connect = (connection, obj) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection db not supplied!'))
    }
    resolve(repository(connection, obj))
  })
}

// the only exposed method of this module
module.exports = Object.assign({}, {connect})

////////////////////////////////////////
// future development footnote
///////////////////////////////////////
const Api = class Api {
    constructor (workobj) {
      }

    getMessage () {
      return new Promise((resolve, reject) => {
        resolve(this.message)
      })
    }

    getMessageFrom () {
      return new Promise((resolve, reject) => {
        resolve(this.message.From)
      })
    }

    getMachineName () {
      return new Promise((resolve, reject) => {
        resolve(this.machine.name)
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
     //
     postAgentResponse = (apiparm) => {
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
      resolve("working on api agent response")
      })
    }
  }
