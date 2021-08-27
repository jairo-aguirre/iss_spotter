const request = require('request');

const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API
  request('https://api64.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null); // creates an Error object that we can pass it back to the callback to indicate that something went wrong.
      return;
    }
  
    const ip = JSON.parse(body);

    callback(null, ip.ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const coordinates = {
      latitude: JSON.parse(body).latitude,
      longitude: JSON.parse(body).longitude
    };

    callback(null, coordinates);
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};