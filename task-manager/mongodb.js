//CRUD create read update delete

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

//The above lines can also be written as follows:
// const {MongoClient, ObjectID} = require('mongodb')

//using 'localhost' causes issues that slow down the app - reasons are unknown but it seems to be remedied by typing out the IP address instead
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to database!');
    }
    const db = client.db(databaseName);
    //=== UPDATE ONE ===
    // db.collection('users')
    //   .updateOne(
    //     { _id: new ObjectID('5e1ce3f0285b110118c1c490') },
    //     {
    //       $inc: {
    //         age: 1,
    //       },
    //     }
    //   )
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log('error', error);
    //   });

    //=== UPDATE MANY ===
    // db.collection('tasks').updateMany({ $set: { completed: true } }).then(result => {
    //   console.log(result)
    // }.catch(error)=> {
    //   console.log(error)
    // });

    // === UPDATE ONE ===
    // db.collection('users')
    //   .updateOne(
    //     { _id: new ObjectID('5e1ce3f0285b110118c1c490') },
    //     {
    //       $inc: {
    //         age: 1,
    //       },
    //     }
    //   )
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log('error', error);
    //   });

    // === UPDATE MANY ===
    // db.collection('tasks')
    //   .updateMany({ completed: false }, { $set: { completed: true } })
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // === DELETE MANY ===
    // db.collection('users')
    //   .deleteMany({ age: 27 })
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // === DELETE ONE ===
    db.collection('tasks')
      .deleteOne({
        _id: new ObjectID('5e1ce7cb6a688502626ff236'),
      })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }
);
