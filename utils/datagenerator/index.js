'use strict';

//////////////////////////////////////////////////////
////////      xchg authorization and routes   ///////
////////////////////////////////////////////////////
const response =         require('../api/db');
const isValidUrl =       require('../utils').isValidUrl;
const XLSX =             require("xls-to-json");

// load an array of response objects when initializing projects
// ensure the latest version of the training responses are in mongodb
// but first drop the collection

let responses = []

response.dropRsp()

XLSX({
    input: "./sampleresponses.xls",
    output: "./sampleresponses.json",
    sheet: "responses"
  }, function(err, result) {
    if(err) {
      console.error(err);
    } else {
      // create a mongodb collection with the response objects and export array
      // test the url fields for links that should be used during text processing
      result.filter((item) => {
        item.isMedia = false;
        item.isAttach = false;
        item.isRedirect = false;
        if (isValidUrl(item.mediaurl)) item.isMedia = true;
        if (isValidUrl(item.attachurl)) item.isAttach = true;
        if (isValidUrl(item.redirecturl)) item.isRedirect = true;
        responses.push(item)
        response.saveRsp(item, () => {
          // do nothing on callback
        })
      })
    }
  })
module.exports = {responses: responses}
