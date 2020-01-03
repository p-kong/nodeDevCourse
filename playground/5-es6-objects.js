//Object property shorthand

const name = 'Andrew';
const userAge = 27;

const user = {
  // previously: name: name,
  // short hand syntax (name)
  name,
  age: userAge,
  location: 'Philadelphia',
};

console.log(user);

//Object destructuring

const product = {
  label: 'Red notebook',
  price: 3,
  stock: 201,
  salePrice: undefined,
  rating: 4.2,
};

const transaction = (type, { label, stock }) => {
  console.log(type, label, stock);
};

transaction('order', product);

const { label, stock, price, salPrice } = product;
