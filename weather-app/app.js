const axios = require("axios");
const geocode = require("./utills/utills");

// const urlGeocode = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;

// axios
//   .get(urlGeocode)
//   .then((response) => {
//     // const latitude = response.data.results[0].latitude;
//     // const longitude = response.data.results[0].longitude;
//     const { latitude, longitude } = response.data.results[0];
//     console.log(latitude, longitude);

//     const urlWeather = `https://api.weatherstack.com/current?access_key=fcd69a396f2bfe67b04ab3829fd1cd38&query=${latitude},${longitude}&units=m`;

//     axios
//       .get(urlWeather)
//       .then((response) => {
//         const currentData = response.data.current;
//         console.log(
//           `${currentData.weather_descriptions[0]}.It is currently ${currentData.temperature} degrees out there. However , it feels like ${currentData.feelslike} degree out`
//         );
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

// CALLBACK USAGE

geocode(process.argv[2], (error, location) => {
  if (error) {
    return console.log("Error:", error);
  }

  console.log("Geocode Data:", location);
});
