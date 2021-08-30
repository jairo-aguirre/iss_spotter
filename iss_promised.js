const request = require('request-promise-native');

const fetchMyIP = (() => {
  return request('https://api64.ipify.org/?format=json');
  // return request('');
});

const fetchCoordsByIP = ((body) => {
  const myIP = JSON.parse(body).ip;

  return request(`https://freegeoip.app/json/${myIP}`);
});

const fetchISSFlyOverTimes = ((body) => {
  const {latitude, longitude} = JSON.parse(body)
  
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
});

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    })
}

// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
module.exports = {nextISSTimesForMyLocation};