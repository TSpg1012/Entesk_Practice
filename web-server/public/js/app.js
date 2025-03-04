const weatherForm = document.querySelector(".weatherForm");
const weatherAddress = document.querySelector(".weatherAddress");

const Longitude = document.querySelector(".longitude");
const Latitude = document.querySelector(".latitude");
const Forecast = document.querySelector(".forecast");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = weatherAddress.value;

  if (location.length === 0) {
    console.log("There is no Address");
    return;
  }

  axios
    .get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`
    )
    .then((response) => {
      if (!response.data.results || response.data.results.length === 0) {
        console.log("This is not a valid address");
        return;
      }

      const { latitude, longitude } = response.data.results[0];

      axios
        .get(
          `https://api.weatherstack.com/current?access_key=fcd69a396f2bfe67b04ab3829fd1cd38&query=${latitude},${longitude}&units=m`
        )
        .then((res) => {
          if (!res.data.current) {
            console.log("Weather data not found");
            return;
          }

          console.log(latitude, longitude);
          
          const currentData = res.data.current;
          const forecast = `${currentData.weather_descriptions[0]}. It is currently ${currentData.temperature}°C out there. However, it feels like ${currentData.feelslike}°C.`;

          longitude.textContent = longitude;
          Latitude.textContent = latitude;
          Forecast.textContent = forecast;
        })
        .catch((error) => {
          console.log("Weather API Error: " + error);
        });

      weatherAddress.value = "";
    })
    .catch((error) => {
      console.log("Geocoding API Error: " + error);
    });
});
