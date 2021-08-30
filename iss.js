const request = require('request');

const fetchMyIP = (callback) => {
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

const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching fly over for coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const flyOver = JSON.parse(body).response;
    
    callback(null, flyOver);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return (error, null);
    }

    fetchCoordsByIP(ip, (error, geolocation) => {
      if (error) {
        return (error, null);
      }
      
      fetchISSFlyOverTimes(geolocation, (error, flyOvers) => {
        if (error) {
          return (error, null);
        }

        callback(null, flyOvers);
      }) 
    })
  })
};

module.exports = {
  // fetchMyIP,
  // fetchCoordsByIP,
  // fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};