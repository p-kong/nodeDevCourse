const https = require('https');

const url =
  'https://api.darksky.net/forecast/a703be8465183e9f437c71e70b67e38d/40,-75';

const request = https.request(url, response => {
  let data = '';
  response.on('data', chunk => {
    data = data + chunk.toString();
  });

  response.on('end', () => {
    // parse the JSON data text
    const body = JSON.parse(data);
    console.log(body);
  });
});
request.on('error', error => {
  console.log('An error', error);
});

request.end();
