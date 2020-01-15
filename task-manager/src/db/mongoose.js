const mongoose = require('mongoose');

//to connect to the database
//provide URL and options object
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
});

//Defining a model
// const User = mongoose.model('user', {
//   name: { type: String },
//   age: { type: Number },
// });

const Task = mongoose.model('task', {
  description: { type: String },
  completed: { type: Boolean },
});

//creating a new instance of the model
// const me = new User({
//   name: 'Andrew',
//   age: 27,
// });

const task = new Task({
  description: 'Wash dishes',
  completed: false,
});

//saving instance to the database. to save the model instance - use the save method. This returns a promise.
// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch(error => {
//     console.log('error', error);
//   });

chore
  .save()
  .then(() => {
    console.log(chore);
  })
  .catch(error => {
    console.log('error', error);
  });
