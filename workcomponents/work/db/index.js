


//////////////////
//Now you can import it and use it with other mixins:
/*
As you can see, the reusable withConstructor() mixin is simply
dropped into the pipeline with other mixins.
withBattery() could be used with other kinds of objects, like robots,
electric skateboards, or portable device chargers.
withFlying() could be used to model flying cars, rockets, or air balloons.
*/
const {withFlying}  = require('../../functions/getWorkTest')
const {constructor} = require('./constructor');

const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
// or `import pipe from 'lodash/fp/flow';`
// Set up some functional mixins

/*
const withFlying = o => {
  let isFlying = false;
  return {
    ...o,
    fly () {
      isFlying = true;
      return this;
    },
    land () {
      isFlying = false;
      return this;
    },
    isFlying: () => isFlying
  }
};
*/
const withBattery = ({ capacity }) => o => {
  let percentCharged = 100;
  return {
    ...o,
    draw (percent) {
      const remaining = percentCharged - percent;
      percentCharged = remaining > 0 ? remaining : 0;
      return this;
    },
    getCharge: () => percentCharged,
    get capacity () {
      return capacity
    }
  };
};
const createDrone = ({ capacity = '3000mAh' }) => pipe(
  //getWorkObj(),
  withFlying,
  withBattery({ capacity }),
  constructor(createDrone)
)({});
const myDrone = createDrone({ capacity: '5500mAh' });

console.log(`
  can fly:  ${ myDrone.fly({}).isFlying() === true }
  can land: ${ myDrone.land().isFlying() === false }
  battery capacity: ${ myDrone.capacity }
  battery status: ${ myDrone.draw(50).getCharge() }%
  battery drained: ${ myDrone.draw(75).getCharge() }%
  getdb: ${ JSON.stringify(myDrone.getdb())}
  update message: ${ myDrone.setdb({msg: 'updates from my drone '})}
  get db: ${ JSON.stringify(myDrone.getdb())}
  another update: ${ JSON.stringify(myDrone.setdb({msg: 'THIS UPDATE '}))}
  get db: ${ JSON.stringify(myDrone.getdb())}
  experiment1: ${ JSON.stringify(myDrone.fly({}))}
  experiment2: ${ JSON.stringify(myDrone.fly({msg: "hey", price: "free"}))}
`);
console.log(`
  constructor linked: ${ myDrone.constructor === createDrone }
`);

exports.newDrone = createDrone({ capacity: '7777mAh' });

exports.createDrone = createDrone


/// My TESTS .... Will a new object be created?
