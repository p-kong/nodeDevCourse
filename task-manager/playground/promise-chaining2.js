require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete('5e1e7bd48b4413132f8e7e16').then(task => {
  console.log(task);
  return Task.countDocuments({ completed: false })
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });
});
