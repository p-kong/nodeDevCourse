const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocations } = require('./utils/messages');
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
//socketio expects to be called with a raw http server which is why we had to create the line above. Express does it automatically, but we need to specifically pass this into the code below
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

// let count = 0;

//io.on is only for connection. This is a built in event from socket.io
io.on('connection', socket => {
  console.log('new websocket connection');

  //io.to.emit - emits an event to everyone in a specific room
  //socket.broadcast.to.emit - emits an event to everone but the user in a specific room
  socket.on('join', ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    //socket.emit - to a specific connection
    socket.emit('message', generateMessage('Admin', 'Welcome!'));

    //socket.broadcast.emit - sends a message to everyone but the user
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        generateMessage('Admin:', `${user.username} has joined!`)
      );
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed!');
    }
    //io.emit - emits to every connected client
    io.to(user.room).emit('message', generateMessage(user.username, message));
    callback();
  });

  socket.on('sendLocation', (coordinates, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit(
      'locationMessage',
      generateLocations(
        user.username,
        `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`
      )
    );
    callback();
  });

  //disconnect is a built in event
  socket.on('disconnect', () => {
    let user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        generateMessage(`Admin: ${user.username} has left`)
      );
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

//server instead of app.listen
server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
