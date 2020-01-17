// const doWorkPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve([7, 4, 1]);
//     reject('Things went wrong');
//   }, 2000);
// });

// doWorkPromise
//   .then(result => {
//     console.log('success', result);
//   })
//   .catch(error => {
//     console.log('Error', error);
//   });

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

// add(1, 2)
//   .then(sum => {
//     console.log(sum);
//   })
//   .catch(error => {
//     console.log(error);
//   });

//promise chaining
add(1, 1)
  .then(sum => {
    console.log(sum);
    return add(sum, 4);
  })
  .then(sum2 => {
    console.log(sum2);
  })
  .catch(error => {
    console.log(error);
  });