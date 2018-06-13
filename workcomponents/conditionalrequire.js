
// set this up as the index file on a folder --- test for existenace of
// companion file and export it

// could also test for env property ---
// if (messaging) => exports out

const fs = require('fs');
const path = require('path');

const fileExist = fs.existsSync(path.resolve(__dirname, 'configuration.json'));

if (fileExist) {
    module.exports = require('./configuration.json');
} else {
    module.exports = require('./configuration_template.json');
}
