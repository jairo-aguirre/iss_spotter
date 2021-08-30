const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
} = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log('It didn\'t work!' , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('66.183.35.185', (error, coordinates) => {
//   if (error) {
//     console.log('It didn\'t work!', error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:', coordinates);
// });

// fetchISSFlyOverTimes({ latitude: 49.2185, longitude: -123.034 }, (error, flyOver) => {
//   if (error) {
//     console.log('It didn\'t work!', error);
//     return;
//   }

//   console.log('It worked! Returned Fly Over:', flyOver);
// });

nextISSTimesForMyLocation((error, passTime) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  
  console.log(passTimes);
});