require('../src/db/mongoose');
const User = require('../src/models/user');
const Task = require('../src/models/task');

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

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount('5e1f29befcccfa182630aec1', 2)
  .then(count => {
    console.log(count);
  })
  .catch(error => {
    console.log(error);
  });
