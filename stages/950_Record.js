'use strict';

///////////////////////////////////////////////////////////////
////////            stages for message interaction     ///////
///////                      c 2018 xio               ////////
/////////////////////////////////////////////////////////////

const uuidv1 =                require('uuid/v1')
const clone =                 require('clone-deep')
const { g, b, gr, r, y } =    require('../console');

// at this stage, obj has a complete record of the interaction. Record to db

exports.record = (m) => {
  console.log("----------Record Stage-------------")

  return new Promise((resolve, reject) => {
    let obj = m.getWorkObj()
    let conn = m.getConnection()

    m.saveInteraction(obj, conn).then(() => {
      console.log("message recorded")
    })

    resolve(m)
  })
}
