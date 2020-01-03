const request = require('request');

const forecast = (longitude, latitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/a703be8465183e9f437c71e70b67e38d/' +
    latitude +
    ',' +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services!', undefined);
    } else if (body.error) {
      callback('Unable to find location. Please try another search', undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          ` It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
