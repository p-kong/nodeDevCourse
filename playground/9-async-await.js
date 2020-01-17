const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject('Numbers must be positive');
      }
      resolve(a + b);
    }, 2000);
  });
};

//place async just before the function
//an async functions always returns a promise. the promise is fulfilled with the value you chose to return

const doWork = async () => {
  //await works with the promise returned
  //the 'await' operator works only with async
  const sum = await add(1, 99);
  const sum2 = await add(sum, 50);
  const sum3 = await add(sum2, -3);
  return sum3;
};

doWork()
  .then(result => {
    console.log('result:', result);
  })
  .catch(error => {
    console.log('error:', error);
  });
