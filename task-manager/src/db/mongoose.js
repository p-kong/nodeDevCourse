const mongoose = require('mongoose');
const validator = require('validator');

//to connect to the database
//provide URL and options object
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//creating a new instance of the model
// const me = new User({
//   name: 'John     ',
//   email: 'John@email.com     ',
//   password: 'JohnJohn',
// });

// const chore = new Task({
//   description: 'Buy groceries',
// });

//saving instance to the database. to save the model instance - use the save method. This returns a promise.
// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch(error => {
//     console.log('error', error);
//   });

// chore
//   .save()
//   .then(() => {
//     console.log(chore);
//   })
//   .catch(error => {
//     console.log('error', error);
//   });
