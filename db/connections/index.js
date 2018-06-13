'use strict';

//////////////////////////////////////////////////////
////////   mongoose connection manager        ///////
////////////////////////////////////////////////////
const mongoose =          	require('mongoose')

const options = {
  	poolSize: 10, // Maintain up to x socket connections
    autoReconnect: true,
    autoIndex: false,
    reconnectTries: Number.MAX_SAFE_INTEGER
    }

const allConnections = {};

const log = console

// object to facilitate mgmt and reuse of connections on multitenant platform
// REFACTOR - drop connections from array on disconnect

// REFACTOR - graceful handling of errors

module.exports = function(url, dbName, cb) {
  const api = url + dbName;
  let conn;
  conn = allConnections[api];
  if (!conn) {
    log.info('creating new connection for ' + api);
    conn = mongoose.createConnection(api, options);
    // Log database connection events
    allConnections[api] = conn;
    conn.on('connected', () => {
      log.info('Mongoose connection open to ' + api)
      console.log("--------Keys in AllConnections Table--------")
      for (var key in allConnections) {
          console.log(key);
        }
      return cb(conn)
    })
    conn.on('error', (err) =>  log.error('Mongoose connection error: ' + err));
    conn.on('disconnected', () => log.error('Mongoose connection disconnected'));
  }
  else {
    log.info('reusing existing connection for ' + api)
    return cb(conn)
  }

}
