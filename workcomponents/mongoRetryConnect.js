
let conn;
for (let i = 0; i < numRetries; ++i) {
  try {
    conn = await mongoose.createConnection(uri);
    break;
  } catch (error) {}
}


///////////////////////
const allConnections = {};

module.exports = function(dbName) {
  const url = 'http://localhost/' + dbName;
  let conn;
  log.info('initializing database connection to: ' + url);

  conn = allConnections[url];
  if (!conn) {
    log.info('creating new connection for ' + url);
    conn = mongoose.createConnection(url, {
      useMongoClient: true,
      autoReconnect: true,
      autoIndex: false,
      reconnectTries: Number.MAX_SAFE_INTEGER
    });
    // Log database connection events
    conn.on('connected', () => log.info('Mongoose connection open to ' + url));
    conn.on('error', (err) =>  log.error('Mongoose connection error: ' + err));
    conn.on('disconnected', () => log.error('Mongoose connection disconnected'));
    allConnections[url] = conn;
  }
  else {
    log.info('reusing existing connection for ' + url);
  }
  return conn;
}




/////////////////////////////////


function createConnection (dbURL, options) {
    var db = mongoose.createConnection(dbURL, options);

    db.on('error', function (err) {
        // If first connect fails because mongod is down, try again later.
        // This is only needed for first connect, not for runtime reconnects.
        // See: https://github.com/Automattic/mongoose/issues/5169
        if (err.message && err.message.match(/failed to connect to server .* on first connect/)) {
            console.log(new Date(), String(err));

            // Wait for a bit, then try to connect again
            setTimeout(function () {
                console.log("Retrying first connect...");
                db.openUri(dbURL).catch(() => {});
                // Why the empty catch?
                // Well, errors thrown by db.open() will also be passed to .on('error'),
                // so we can handle them there, no need to log anything in the catch here.
                // But we still need this empty catch to avoid unhandled rejections.
            }, 20 * 1000);
        } else {
            // Some other error occurred.  Log it.
            console.error(new Date(), String(err));
        }
    });

    db.once('open', function () {
        console.log("Connection to db established.");
    });

    return db;
}

// Use it like
var db = createConnection('mongodb://...', options);
var User = db.model('User', userSchema);
