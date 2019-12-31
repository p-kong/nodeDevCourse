// const square = function(x) {
//   return x * x;
// };

// const square = x => {
//   return x * x;
// };

// //if there is just a single statement
// const square = x => x * x;

// console.log(square(2));

// const event = {
//   name: 'Birthday Party',
//   printGuestList: function() {
//     console.log('Guest list for ' + this.name);
//   },
// };
// event.printGuestList();

//arrow functions do not bind their own 'this' value.
//arrow functions are not well suited for method properties that are functions when you want to access 'this'
// const event = {
//   name: 'Birthday Party',
//   printGuestList: () => {
//     console.log('Guest list for ' + this.name);
//   },
// };
// event.printGuestList();

//arrow functions do not bind their own 'this' value - they access the 'this' value in the context in which they are created.
//**do not use arrow functions for methods
const event = {
  name: 'Birthday Party',
  guestList: ['Andrew', 'Jen', 'Mike'],
  printGuestList() {
    console.log('Guest list for ' + this.name);
    this.guestList.forEach(guest =>
      console.log(guest + ' is attending ' + this.name)
    );
  },
};
event.printGuestList();
