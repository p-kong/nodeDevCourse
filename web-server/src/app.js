//allows us to easily manipulate paths
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
//express expects views to be in a 'views' folder - we changed the folder name from 'views' to 'templates'. This is done to point express to the directory with the views
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
//to set up handlebars (hbs node module) to create dynamic templates on webpages. Express expects all of our 'views' to be in a 'views' folder at the root of the file
app.set('view engine', 'hbs');
//pointing express to the path with the views
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
//express.static takes the path of the folder we want to serve up (public folder)
app.use(express.static(publicDirectoryPath));

//route to get to the dynamic template file. Originally not needed for static pages because the "app.use(express.static)..." generates the main static page
app.get('', (req, res) => {
  //.render(name of view to render, object that contains that view to be able to access
  res.render('index', { title: 'Weather', name: 'Andrew Mead' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Page', name: 'Andrew Mead' });
});

app.get('/help', (req, res) => {
  res.render('help', { title: 'Help Page', name: 'Andrew Mead' });
});

//404 catch page for help
app.get('/help/*', (req, res) => {
  res.send('Help article not found');
});

app.get('/weather', (req, res) => {
  res.send({ forecast: 'sunny' }, { location: 'New York' });
});

//* = wildcard character - will match when everything else above does not
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Andrew Mead',
    errorMessage: 'Page not found',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
