// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss_promised');
const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((flyOvers) => {
    console.log(flyOvers);
  })
  .catch((error) => {
    console.log('It didn\'t work:', error.message)
  });