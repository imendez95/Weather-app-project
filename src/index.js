let time = new Date();
let currentTime = document.querySelector(".updated-date-time");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[time.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[time.getMonth()];
let date = time.getDate();
let hours = time.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = time.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentTime.innerHTML = `${day}, ${month} ${date}, ${hours}:${minutes} `;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#next-five-days");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="card" style="width: 6rem;">
                ${formatDay(forecastDay.dt)}
                <div class="weather-emoji"> <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" width="46px"></div>
                <div class="upcoming-temp"><strong>${Math.round(
                  forecastDay.temp.max
                )}° <small>F</small></strong> / ${Math.round(
          forecastDay.temp.min
        )}° <small>F</small></div>
              </div>
            </div>
          
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5eea2f588c4b48453c8e1f6c7b6f46fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function newCityEntered(response) {
  document.querySelector("#city-typed").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#hi-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  fahrenheitTemp = Math.round(response.data.main.temp);

  let iconElement = document.querySelector("#current-temp-emoji");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchNewCity(city) {
  let apiKey = "5eea2f588c4b48453c8e1f6c7b6f46fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(newCityEntered);
}

function search(event) {
  event.preventDefault();
  let newCity = document.querySelector("#new-city").value;
  searchNewCity(newCity);
}

function searchCurrentLocation(position) {
  let apiKey = "5eea2f588c4b48453c8e1f6c7b6f46fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(newCityEntered);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

function displayCelcius(event) {
  event.preventDefault();
  let clickC = document.querySelector("#current-temp");
  unitF.classList.remove("active");
  unitC.classList.add("active");
  let celciusTemp = [(fahrenheitTemp - 32) * 5] / 9;
  clickC.innerHTML = Math.round(celciusTemp);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let clickF = document.querySelector("#current-temp");
  unitF.classList.add("active");
  unitC.classList.remove("active");
  clickF.innerHTML = Math.round(fahrenheitTemp);
}

let unitC = document.querySelector("#celcius-link");
unitC.addEventListener("click", displayCelcius);

let unitF = document.querySelector("#fahrenheit-link");
unitF.addEventListener("click", displayFahrenheit);

let fahrenheitTemp = null;

let form = document.querySelector("#submit-city");
form.addEventListener("click", search);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);
