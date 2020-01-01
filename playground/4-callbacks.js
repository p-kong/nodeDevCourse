// // callback funciton is the '() => console.log()
// // callback function is a function that is passed as an argument to another function with the intention of it being called later on.
// setTimeout(() => console.log('Two seconds'), 2000);

// const names = ['Andrew', 'Jen', 'Jess'];
// const shortNames = names.filter(name => {
//   return name.length <= 4;
// });

// //async function
// const geocode = (address, callback) => {
//   setTimeout(() => {
//     const data = {
//       latitude: 0,
//       longitude: 0,
//     };
//     callback(data);
//   }, 2000);
// };

// //geocode will not have a direct return value (expected)
// //-------address------allback (name does not need to match line 17 - make sure the position matches (first argument)
// geocode('Philadelphia', data2 => {
//   console.log(data2);
// });

//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

// previously had the callback function after the call to the add function. **need to have it before
// callback function incorrectly written (commented out)

const add = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
    // const sum = console.log(a + b);
    // callback(sum);
  }, 2000);
};

add(1, 4, sum => {
  console.log(sum); // Should print: 5
});
