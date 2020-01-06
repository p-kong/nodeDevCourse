const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
//socketio expects to be called with a raw http server which is why we had to create the line above. Express does it automatically, but we need to specifically pass this into the code below
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

// let count = 0;

//connection is a built in event from socket.io
io.on('connection', socket => {
  console.log('new websocket connection');
  socket.emit('message', 'welcome');
  socket.on('sendMessage', message => {
    io.emit('message', message);
  });
  // //send event from the server to the client. Below is a custom event
  // socket.emit('countUpdated', count);
  // //the server is listening for the 'increment' event from the client and then performs the function (incrementing the count by 1)
  // socket.on('increment', () => {
  //   count++;
  //   //socket.emit('countUpdated', count); - emits to a specific connection
  //   //io.emit - emits to every single connection
  //   io.emit('countUpdated', count);
  // });
});

//server instead of app.listen
server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
