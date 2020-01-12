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

//Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;

const locationTemplate = document.querySelector('#location-message-template')
  .innerHTML;

const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

// Options
//ignoreQueryPrefix - by default it is 'false' by setting it to true - it remove the question mark when we enter 'location.search' in the chrome console '?username=###&room=####'
//this returns an object with key value pairs
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const autoscroll = () => {
  //New Message element
  const $newMessage = $messages.lastElementChild;

  //Get height of new message
  //returns an object with properties of all the styles applied
  const newMessageStyles = getComputedStyle($newMessage);
  //margin bottom = a property of the styles provided in newMessageStyles
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

  //Visible Height - height of the container that you can view
  const visibleHeight = $messages.offsetHeight;

  //Height of messages container
  const containerHeight = $messages.scrollHeight;

  //How far have I scrolled?
  //scrollTop - gives you the amount of distance you've scrolled from the top (as a number)
  const scrollOffset = $messages.scrollTop + visibleHeight;

  if (containerHeight - newMessageHeight <= scrollOffset) {
    $messages.scrollTop = $messages.scrollHeight;
  }

  console.log(newMessageMargin);
};

socket.on('message', message => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format('h:mm a'),
  });
  $messages.insertAdjacentHTML('beforeend', html);
  autoscroll();
});

socket.on('locationMessage', message => {
  console.log(message);
  const html = Mustache.render(locationTemplate, {
    username: message.username,
    url: message.url,
    createdAt: moment(message.createdAt).format('h:mm a'),
  });
  $messages.insertAdjacentHTML('beforeend', html);
  autoscroll();
});

socket.on('roomData', ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, {
    room,
    users,
  });
  document.querySelector('#sidebar').innerHTML = html;
});

$messageForm.addEventListener('submit', e => {
  e.preventDefault();
  //disable the submit button after sending but prior to retrieving data
  $messageFormButton.setAttribute('disabled', 'disabled');

  // const message = document.querySelector('input').value;
  const message = e.target.elements.message.value;
  socket.emit('sendMessage', message, error => {
    $messageFormButton.removeAttribute('disabled');
    $messageFormInput.value = '';
    $messageFormInput.focus();

    if (error) {
      return console.log(error);
    }
    console.log('Message delievered');
  });
});

$sendLocationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.');
  }
  $sendLocationButton.setAttribute('disabled', 'disabled');

  navigator.geolocation.getCurrentPosition(position => {
    socket.emit(
      'sendLocation',
      {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      },
      () => {
        $sendLocationButton.removeAttribute('disabled');
        console.log('Location shared');
      }
    );
  });
});

socket.emit('join', { username, room }, error => {
  if (error) {
    alert(error);
    location.href = '/';
  }
});
