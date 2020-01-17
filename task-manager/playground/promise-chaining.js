require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate('5e1f29befcccfa182630aec1', { age: 1 })
  .then(user => {
    console.log(user);
    return User.countDocuments({ age: 1 });
  })
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  });
