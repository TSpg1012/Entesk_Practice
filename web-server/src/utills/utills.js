const axios = require("axios");

const geocode = (city, callback) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;

  axios
    .get(url)
    .then((response) => {
      if (!response.data.results) {
        return callback("City not found!", null);
      }

      console.log(response.data);
      if (!response.data.results || response.data.results.length === 0) {
        return callback("City not found!", null);
      }

      // Destructure latitude and longitude safely

      const location = response.data.results[0];
      const { latitude, longitude } = location;
      console.log(longitude, latitude);

      const urlWeather = `https://api.weatherstack.com/current?access_key=fcd69a396f2bfe67b04ab3829fd1cd38&query=${latitude},${longitude}&units=m`;

      axios
        .get(urlWeather)
        .then((weatherResponse) => {
          if (!weatherResponse.data.current) {
            return callback("Weather data not found!", null);
          }

          const currentData = weatherResponse.data.current;
          const weatherInfo = `${currentData.weather_descriptions[0]}. It is currently ${currentData.temperature}°C out there. However, it feels like ${currentData.feelslike}°C.`;

          callback(null, { latitude, longitude, forecast: weatherInfo });
        })
        .catch((error) => callback(error.message, null));
    })
    .catch((error) => callback(error.message, null));
};

module.exports = geocode;
