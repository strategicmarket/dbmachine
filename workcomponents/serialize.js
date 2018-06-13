


// in order to use a rest interface and send an object with methods,
// it needs to be serialized

// code example for serializing and deserializing an object -- and avoiding eval

obj = {var1: "val1", var2: "val2", func1: function() {console.log("transferred function");}}

var sendObj = {};

for(i in obj) {
    if(typeof obj[i] === "function") {
      sendObj[i] = obj[i].toString();
    } else {
      sendObj[i] = obj[i];
    }
  }
console.log(sendObj);

var newObj = {};

for(i in sendObj) {
  if(sendObj[i].contains("function ()")) {
    newObj[i] = new Function("return " + sendObj[i])();
  } else {
    newObj[i] = sendObj[i];
  }
}


///////////// sample code below using reviver and replacer patterns of parse and stringify
//////////// this code never worked -- kept getting an eval console.error

let replacer = (key, value) => {
  // if we get a function give us the code for that function
  if (typeof value === 'function') {
    return value.toString();
  }
  return value;
}
// get a stringified version of our object
// and indent the keys at 2 spaces
const serialized = JSON.stringify(testObject, replacer, 2);

//  console.log(serialized);

// de_serialize.js
let reviver = (key, value) => {
  if (typeof value === 'string'
  && value.indexOf('function ') === 0) {
    //let functionTemplate = `(${value})`;
    //let functionTemplate = '(' + value + ')';
    let functionTemplate = '(' + "function () {return \"hello eval\"}" + ')';
    console.log("DEBUG EVAL")
    console.log(functionTemplate)
    //return eval(functionTemplate);
    var ev
    try {
      ev = eval(functionTemplate)
    }
    catch(error) {
      console.log(error)
    }

    console.log(ev)
    return ev
  }
  return value;
}
const parsedObject = JSON.parse(serialized, reviver);
