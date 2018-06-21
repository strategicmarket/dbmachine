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
    process.exit();
  }

  // After performing the "check", the next set of configs is intiated
  buildConfig();

}


// This function holds the process logic for configuring test data bases
function buildConfig() {

  // We create a list prompt. Specifying that the user must pick a random number between 1 and 5.
  inquirer.prompt([
    {
      type: "list",
      name: "userGuess",
      message: "Try to stay alive! Guess a number between [1-5]",
      choices: ["1", "2", "3", "4", "5"]
    }

  ]).then(function(guess) {

    // If the user is still alive or the zombie is still alive
    if (userHealth > 0 || zombieHealth > 0) {

      // Assign a random damage value for the round.
      var damage = Math.floor(Math.random() * 5) + 1;

      // The zombie should choose a random number.
      var zombieNum = Math.floor((Math.random() * 5)) + 1;
      console.log("");
      console.log("");
      console.log("Zombie rolled " + zombieNum);

      // If the user's guess matches the number then...
      if (zombieNum === parseInt(guess.userGuess)) {

        // Subtract the damage amount from the zombie's health.
        zombieHealth -= damage;
        console.log("YOU HIT THE ZOMBIE WITH " + damage + " damage");
        console.log("You have " + userHealth + " health left. The Zombie has " + zombieHealth + " health left.");

        // Check if the game is over.
        checkRound();
      }

      else {
        // Subtract the damage amount from the user's health.
        userHealth -= damage;
        console.log("OH NO! The zombie slashed you with " + damage + " damage");
        console.log("You have " + userHealth + " health left. The Zombie has " + zombieHealth + " health left.");

        // Check if the game is over.
        checkRound();

      }
    }
  });
}

// Starts the game!
playRound();
