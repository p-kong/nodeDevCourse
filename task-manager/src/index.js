const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/users');
const taskRouter = require('./routers/tasks');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   res.status(503).send('System under maintence');
// });

// app.use((req, res, next) => {
//   if (req.method === 'GET') {
//     res.send('GET requests are disabled');
//   } else {
//     next();
//   }
// });

//to get the data to use to create a new user
//parses incoming JSON into an object
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});

const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
  // const task = await Task.findById('5e24ae3c9df39a5e2dfad0c7');
  // await task.populate('owner').execPopulate();
  // console.log(task.owner.name);

  const user = await User.findById('5e24ac448181cb5db0745921');
  await user.populate('tasks').execPopulate();
  console.log(user.tasks);
};

main();
