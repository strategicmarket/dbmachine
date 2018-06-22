require('dotenv').config()
////////////////////////////////////////////////////////////////
////////              x.io                             ////////
//////            mainline processing                 ///////
//////       c xio 2016 - all rights reserved        ///////
///////////////////////////////////////////////////////////
const express =            require("express")
const q =                  require("inquirer")

const { g, b, gr, r, y } = require('../console');

const app = express()

//////////////////////////////////////////////////////
////////// Test Data Generator Bot   ///////////////
////////////////////////////////////////////////////

function checkURL() {

  console.log("");
  console.log("");

  // If invalid url.
  if (invalidurl) {

    console.log("###############################################");
    console.log("");
    console.log("URL Entered Not Valid");
    console.log("");
    console.log("###############################################");

    // Exit
    start();
  }

  // After performing the "check", the next set of configs is intiated
  return

}


// This function holds the process logic for configuring test data bases
function start() {

  // We create a list prompt. Specifying that the user must pick a random number between 1 and 5.
  q.prompt([
    {
      type: "list",
      name: "testEnv",
      message: "Do you want to generate test data for MLAB or localhost?",
      choices: ["MLAB", "localhost", "exit"]
    }

  ]).then(function(answer) {

    if (answer.testEnv.toUpperCase() == "MLAB") {
      genCloud()
    }
    if (answer.testEnv.toUpperCase() == "LOCALHOST") {
      genLocal()
    }
    if (answer.testEnv.toUpperCase() == "EXIT"){
      process.exit()
    }

  });
}

function genLocal() {
  console.log("###############################################");
  console.log("");
  console.log("Generating localhost Test Database");
  console.log("");
  console.log("###############################################");

  let dbParms = {}
  dbParms.envState = false
  require('../db/seedTestDb')(dbParms)

}

function genCloud() {
  console.log(b("###############################################"));
  console.log("");
  console.log(b("Generating Cloud Test Database"));
  console.log(b("Note - This Action Will Modify the client.js Collection for 3 Test Clients"))
  console.log(b("Machines, Chaotic and Mercy"))
  console.log(b("Review docs for further detail"))
  console.log("");
  console.log(b("###############################################"));
  console.log("")

  q.prompt([
      {
        name: "platform",
        type: "input",
        message: "What is platform's subdomain?"
      },
      {
        name: "machine",
        type: "input",
        message: "What is machine's subdomain?"
      },
      {
        name: "chaotic",
        type: "input",
        message: "What is chaotic's subdomain?"
      },
      {
        name: "mercy",
        type: "input",
        message: "What is mercy's subdomain?"
      }
    ])
    .then(function(answer) {    
      let dbParms = {}
      let a
      dbParms.envState = true
      a = answer.platform
      dbParms.platform = 'mongodb://machina:Awes0me@' + a + '.mlab.com:' + a.substring(3,8) + '/'
      a = answer.chaotic
      dbParms.chaotic = 'mongodb://machina:Awes0me@' + a + '.mlab.com:' + a.substring(3,8) + '/'
      a = answer.machine
      dbParms.machine = 'mongodb://machina:Awes0me@' + a + '.mlab.com:' + a.substring(3,8) + '/'
      a = answer.mercy
      dbParms.mercy = 'mongodb://machina:Awes0me@' + a + '.mlab.com:' + a.substring(3,8) + '/'
      require('../db/seedTestDb')(dbParms)
    });
}


// server
let port = process.env.PORT || process.env.localport;

app.listen(port, () => {
  console.log(b('listening on port '), port)
  // Starts the process!
  start();
});
