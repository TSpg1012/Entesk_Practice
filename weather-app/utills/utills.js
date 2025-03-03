const axios = require("axios");

const geocode = (city, callback) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;

  axios
    .get(url)
    .then((response) => {
      if (!response.data.results) {
        return callback("City not found!", null);
      }

      const { latitude, longitude } = response.data.results[0];
      callback(null, { latitude, longitude });

      const urlWeather = `https://api.weatherstack.com/current?access_key=fcd69a396f2bfe67b04ab3829fd1cd38&query=${latitude},${longitude}&units=m`;

      axios
        .get(urlWeather)
        .then((response) => {
          if (!response.data.current) {
            return callback("Weather data not found!", null);
          }

          const currentData = response.data.current;
          const weatherInfo = `${currentData.weather_descriptions[0]}. It is currently ${currentData.temperature}°C out there. However, it feels like ${currentData.feelslike}°C.`;

          console.log("Weather Info:", weatherInfo);
        })
        .catch((error) => {
          console.log("error:" + error);
        });
    })
    .catch((error) => {
      callback(error.message, null);
    });
};

module.exports = geocode;
