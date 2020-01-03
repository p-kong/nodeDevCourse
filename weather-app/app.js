const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = process.argv[2];

if (!address) {
  console.log('Please provide an address');
} else {
  //callback chaining
  geocode(address, (error, { longitude, latitude, location }) => {
    if (error) {
      return console.log(error);
    }
    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }
      console.log(location);
      console.log(forecastData);
    });
  });
}

// previous code prior to forecast.js
// const url =
//   'https://api.darksky.net/forecast/a703be8465183e9f437c71e70b67e38d/37.8267,-122.4233';

// //json:true = parses info as a JSON object
// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     console.log('Unable to connect to weather service!');
//   } else if (response.body.error) {
//     console.log('Unable to find location!');
//   } else {
//     console.log(
//       response.body.daily.data[0].summary +
//         ` It is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability}% chance of rain.`
//     );
//   }
// });

// previous code prior to geocode function in geocode.js
// const mapbox =
//   'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoicGtvbmc4OSIsImEiOiJjazE2bWVhdjQwNHd3M2Jrd3NzYTBsb2V0In0.-ojsZJ5hLj7HK8zI56dlEA';

// request({ url: mapbox, json: true }, (error, response) => {
//   if (error) {
//     console.log('Unable to connect to network services');
//   } else if (response.body.features.length === 0) {
//     console.log('Unable to find location');
//   } else {
//     const latitude = response.body.features[0].center[1];
//     const longitude = response.body.features[0].center[0];
//     console.log(latitude, longitude);
//   }
// });
