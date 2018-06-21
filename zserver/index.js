require('dotenv').config()
////////////////////////////////////////////////////////////////
////////              x.io                             ////////
//////            mainline processing                 ///////
//////       c xio 2016 - all rights reserved        ///////
///////////////////////////////////////////////////////////
const q =                  require("inquirer")
const logger =             require("morgan");

const { g, b, gr, r, y } = require('../console');

//////////////////////////////////////////////////////////////////////////
/////////////    Seed test data if test env detected          ///////////
////////////////////////////////////////////////////////////////////////

let envState = true
if ( process.env.isLive == 'false' ) {
    envState = false
    require('../db/seedTestDb')(envState)
  }

//////////////////////////////////////////////////////////////////////////
////////////////////  Register Middleware       /////////////////////////
////////////////////////////////////////////////////////////////////////
app.use(logger("dev"));



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
  inquirer.prompt([
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

// Starts the game!
start();
