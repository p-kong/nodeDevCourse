const fs = require('fs');
// const book = {
//   title: 'Ego is the Enemy',
//   author: 'Ryan Holiday',
// };

//Our data currently is an object and we want to change it to a string. The fs module only knows how to work with string data.

//JSON = takes a js object / array and returns the JSON string representation
// const bookJSON = JSON.stringify(book);
// fs.writeFileSync('1-json.json', bookJSON);

//cannot access the title property because it is not an object - will return undefined
//console.log(bookJSON);

//takes the JSON string and returns back the object
//const parsedData = JSON.parse(bookJSON);
//can access the property 'author' because it is an object
//console.log(parsedData.author);

//read data and got it in binary data
//**const dataBuffer = fs.readFileSync('1-json.json');
//converted the data into a string in JS
//**const dataJSON = dataBuffer.toString();
//parsed the JSON data into an object
//**const data = JSON.parse(dataJSON);
//accessed a property within that data
//**console.log(data.title);

const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);
data.name = 'Bob';
data.age = 50;
console.log(data);

const newData = JSON.stringify(data);
fs.writeFileSync('1-json.json', newData);
