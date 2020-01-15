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
    db.collection('tasks').findOne(
      { _id: new ObjectID('5e1ce7cb6a688502626ff237') },
      (error, task) => {
        if (error) {
          return console.log('Unable to find task ID');
        }
        console.log(task);
      }
    );

    db.collection('tasks')
      .find({ completed: false })
      .toArray((error, tasks) => {
        if (error) {
          return console.log('Unable to find task');
        }
        console.log(tasks);
      });
  }
);
