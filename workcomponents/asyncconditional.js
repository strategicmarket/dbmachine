// conditional await async

const makeRequest = async () => {
  const data = await getJSON()
  if (data.needsAnotherRequest) {
    const moreData = await makeAnotherRequest(data);
    console.log(moreData)
    return moreData
  } else {
    console.log(data)
    return data
  }
}

//error stack
const makeRequest = async () => {
  await callAPromise()
  await callAPromise()
  await callAPromise()
  await callAPromise()
  await callAPromise()
  throw new Error("oops");
}

makeRequest()
  .catch(err => {
    console.log(err);
    // output
    // Error: oops at makeRequest (index.js:7:9)
  })

/////////////////////////
// basic
const getUser = async (query) => {
  const user = await Users.findOne(query);
  const feed = await Feeds.findOne({ user: user._id });

  return { user, feed };
};

// getUser will return a promise
getUser({ username: 'test' }).then(...);

////////////////

// parallel execution
const [user1, user2] = await Promise.all([db.get('user1'), db.get('user2')]);

// series loops
async (items) => {
  for (let i = 0; i < items.length; i++) {
    const result = await db.get(items[i]);
    console.log(result);
  }
}
/////////////////////////////
// conditional loop - this one based on an interval of time

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
/////////////////////////////////
