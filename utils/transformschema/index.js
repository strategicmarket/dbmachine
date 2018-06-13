'use strict';
///////////////////////////////////////////////////////////////////
////////      read the mongoose schema definition          ///////
///////         strip off all defaults and types          ///////
//////       Build the Object definition for objectmodel ///////
///////////////////////////////////////////////////////////////

const keys =        require('all-object-keys')
const nested =      require('nested-property')
const merge =       require('deepmerge')

const schemaTypes = [
    'String', 'Number', 'Date', 'Buffer', 'Boolean', 'Mixed', 'Objectid', 'Array', 'Decimal128' ]
const wordDefault = 'default'

let modelObject = {}         // rebuild the schema after removing Mongoose specific syntax
let defaultObject = {}       // skeleton object with properties set to defaults based on Mongoose schema
let schemaPropArray = ['.type', '.default', '.unique', '.required']   // mongoose schema rserved properties
let matchProperty
let propertyValue
let begIndex
let newKey
let n = 0

exports.transformSchema = (mdl) => {
    return new Promise((resolve, reject) => {

      let obj = JSON.parse(JSON.stringify(mdl))     // had copy to strip any functions?
      let keyArray = keys(obj)                     // build an array of all properties on the schema

      let transformedKeys = keyArray.map((k) => {
        let matchProperty = schemaPropArray.filter( s => k.match(s)) // return an array with matches -- an array of 1

        switch(matchProperty[0]) {
          case '.type':
            // do nothing
            break;

          case '.default':
            begIndex = k.indexOf('.default')
            newKey = k.substr(0, begIndex)                                        // build new key without .default prop
            let defaultValue = k.split('.').reduce((o, i)=>{ return o[i]}, obj)   // fetches the value of .default from object
            buildSchema(newKey, defaultValue, () => {
              return
            })
            break;

          case '.unique':
          case '.required':
            // do nothing in response to these reserved mongoose props
            break;

          default:
            // do nothing - remaining schema properties where type is inferred,
            break;
        }

      })
      resolve(modelObject)
    })
}

//////////////////////////////////////////
// function to build up model schema   ///
/////////////////////////////////////////

const buildSchema = (keyString, value, cb) => {
  let obj = {}
  let mergedObj = {}
  nested.set(obj, keyString, value)     // function to create an object, including nested properties, based on keystring
  mergedObj = merge(modelObject, obj)
  modelObject = Object.assign({}, mergedObj)
  cb()
  }
