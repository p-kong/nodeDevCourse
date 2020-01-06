const socket = io();

// //socket.on takes two arguments - the name of the event and a function to run when the event occurs.
// socket.on('countUpdated', count => {
//   console.log('the count has been updated', count);
// });

// //each time the button is clicked - it emits the event 'increment' to the server
// document.querySelector('#increment').addEventListener('click', () => {
//   console.log('clicked');
//   socket.emit('increment');
// });

socket.on('message', message => {
  console.log(message);
});

document.querySelector('#message-form').addEventListener('submit', e => {
  e.preventDefault();

  const message = document.querySelector('input').value;
  socket.emit('sendMessage', message);
});
