



// retry until sucess
const superagent = require('superagent');

const NUM_RETRIES = 3;

test();

async function test() {
  let i;
  for (i = 0; i < NUM_RETRIES; ++i) {
    try {
      await superagent.get('http://google.com/this-throws-an-error');
      break;
    } catch(err) {}
  }
  console.log(i); // 3
}
///////////////////////////////////////////////
// simple example of async await
/////////////////////////////////////////////
const getUser = async (query) => {
  const user = await Users.findOne(query);
  const feed = await Feeds.findOne({ user: user._id });

  return { user, feed };
};

// getUser will return a promise
getUser({ username: 'test' }).then(...);


///////////////////////////////////
//parallel execution
const [user1, user2] = await Promise.all([db.get('user1'), db.get('user2')]);

///////////////////////////////
// delayed loops and timers
const immediatePromise = () => new Promise((resolve) => setImmediate(resolve));
const timeoutPromise = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));
const z = async () => {
  await x();
  await timeoutPromise(1000); // Wait 1 second

  // You can recurse z if needed
  return y();
}

///////////////////
// series loop
async (items) => {
  for (let i = 0; i < items.length; i++) {
    const result = await db.get(items[i]);
    console.log(result);
  }
}
/////////////
// delayed loop
const randForTen = async () => {
  let results = [];

  for (let i = 0; i < 10; i++) {
    await timeoutPromise(1000);
    results.push(Math.random());
  }
  return results;
}
////////////////////////////
// conditional loop
const runFor = async (time, func, interval) => {
  // Runs an interval until time is past
  while (time > Date.now()) {
    await timeoutPromise(interval);
    // Note that you'll need to account
    // for func execution time if it is
    // async
    func();
  }
};

runFor(Date.now() + 2000, () => console.count('time'), 1000);
// Output:
// time: 1
// time: 2

//////////////////////
// parallel execution using array.map
async (items) => {
  // Note that async functions return a promise
  const promises = items.map(async (item) => {
    const result = await db.get(item);
    // Log individual results as they finish
    console.log(result);
    return result;
  });
  const results = await Promise.all(promises);
  console.log(results);
}

///////////////////
// race condition
const randAsyncTimer = (i) => {
  // Timeout within 1 second
  const timeout = Math.floor(Math.random() * 1000);
  return new Promise((resolve) => setTimeout(() => resolve(i), timeout));
};

async () => {
  let calls = [randAsyncTimer(1), randAsyncTimer(2), randAsyncTimer(3)];
  // Start the race
  const result = await Promise.race(calls);
  console.log(result);
  // Possible outputs are between 1 to 3
}

////////////////
// limit condition
const parallelLimit = async (funcList, limit = 10) => {
  let inFlight = new Set();

  return funcList.map(async (func, i) => {
    // Hold the loop by another loop
    // while the next promise resolves
    while(inFlight.size >= limit) {
      await Promise.race(inFlight);
    }

    console.log(`STARTING ROUND->${i} SIZE->${inFlight.size}`);

    const promise = func();
    // Add promise to inFlight Set
    inFlight.add(promise);
    // Delete promise from Set when it is done
    promise.then(() => inFlight.delete(promise));
  });
}

(async () => {
  const timeoutPromise = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));
  const waitTwoSeconds = async () => await timeoutPromise(2000);
  const promises = await parallelLimit([
    waitTwoSeconds,
    waitTwoSeconds,
    waitTwoSeconds,
    waitTwoSeconds,
    waitTwoSeconds
  ], 2);

  await Promise.all(promises);
  console.log("DONE");
})();
