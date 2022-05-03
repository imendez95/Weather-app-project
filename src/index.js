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
  let iconElement = document.querySelector("#current-temp-emoji");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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
let form = document.querySelector("#submit-city");
form.addEventListener("click", search);

function searchCurrentLocation(position) {
  let apiKey = "5eea2f588c4b48453c8e1f6c7b6f46fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(newCityEntered);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

function displayCelcius(event) {
  event.preventDefault();
  let clickC = document.querySelector("#current-temp");
  clickC.innerHTML = "18°";
}
let unitC = document.querySelector("#celcius-link");
unitC.addEventListener("click", displayCelcius);

function displayFahrenheit(event) {
  event.preventDefault();
  let clickF = document.querySelector("#current-temp");
  clickF.innerHTML = "64°";
}
let unitF = document.querySelector("#fahrenheit-link");
unitF.addEventListener("click", displayFahrenheit);
