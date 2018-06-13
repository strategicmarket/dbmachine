

'use strict'
///////////////////////////////////////////////////////////////////
////////////             Strategic Machines          /////////////
///////////         machine constructor    c2017    //////////////
/////////////////////////////////////////////////////////////////

exports.withFlying = o => {
  let isFlying = false;
  let workObj = {msg: 'old message'}
  return {
    ...o,
    fly (o) {
      isFlying = true;
      console.log("inside fly")
      console.log(o)
      return this;
    },
    land () {
      isFlying = false;
      return this;
    },
    isFlying: () => isFlying,
    getdb: () => workObj,
    setdb (obj) {
      workObj = obj
      return this;
    }
  }
};
