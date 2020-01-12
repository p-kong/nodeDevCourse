const users = [];

const addUser = ({ id, username, room }) => {
  //Clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //validate the data
  if (!username || !room) {
    return {
      error: 'Username and room are required!',
    };
  }
  //check for existing user
  const existingUser = users.find(user => {
    return user.room === room && user.username === username;
  });
  //Validate username
  if (existingUser) {
    return {
      error: 'Username is in use!',
    };
  }
  // Store user
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = id => {
  //findIndex stops running once it finds the id vs reduce will continue to run even after it's found the id
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    //returns an array of the removed element - the [0] pulls the first element in the array
    return users.splice(index, 1)[0];
  }
};

const getUser = id => {
  return users.find(user => user.id === id);
};

const getUsersInRoom = room => {
  return users.filter(user => user.room === room);
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
