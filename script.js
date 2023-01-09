const apiKey = "https://api.openweathermap.org/data/2.5/weather?appid=318e46dcecda78131ced1211af707e28&q=";

window.addEventListener("load", function () {
  const container = document.querySelector(".container");
  container.innerHTML = searchBar();
  const searchButton = document.querySelector(".searchButton");
  searchProcess(searchButton, container);
});

function searchProcess(searchButton, container) {
  searchButton.addEventListener("click", async function () {
    const inputKeyword = document.querySelector(".inputKeyword");
    const weatherData = await getWeather(inputKeyword);
    container.innerHTML = displayWeather(weatherData);
    updateIconBackground();
  });
}

// const quitBtn = document.querySelector(".displayWeather button");
// quitBtn.addEventListener("click", function () {
//   const container = document.querySelector(".container");
//   const background = document.querySelector(".background img");
//   container.innerHTML = searchBar();
//   background.src = "./img/background.jpg";
// });

function getWeather(inputKeyword) {
  return fetch(apiKey + inputKeyword.value)
    .then((response) => {
      if (response.status == 401) {
        alert(response.statusText + " check your API key");
      } else {
        return response.json();
      }
    })
    .then((response) => {
      if (response.cod == 400) {
        const errorText = document.querySelector(".errorMassage .errorText");
        setTimeout(function () {
          displayError();
          errorText.innerHTML = ` <p><i class="fa-solid fa-circle-exclamation" style="margin-right: 10px"></i>ERROR : Please type a city name</p>`;
        }, 800);
      } else if (response.cod == 404) {
        const errorText = document.querySelector(".errorMassage .errorText");
        setTimeout(function () {
          displayError();
          errorText.innerHTML = ` <p><i class="fa-solid fa-circle-exclamation" style="margin-right: 10px"></i>ERROR : Please type a valid city name</p>`;
        }, 800);
      } else {
        return response;
      }
    });
}

function displayWeather(weather) {
  return `<div class="displayWeather">
  <button class="quitBtn">
  <i class="fa-solid fa-chevron-left quitBtn"></i>
  </button>
  <div class="currentWeather">
    <img src="https://openweathermap.org/img/wn/${weather.weather.map((info) => info.icon)}.svg" />
    <h2 class="weatherCondition">${weather.weather.map((info) => info.main)}</h2>
    <p>${weather.weather.map((info) => info.description)}</p>
  </div>
  <div class="line"></div>
  <div class="weatherInfo">
    <h2><i class="fa-solid fa-location-dot" style="margin-right: 10px"></i>Weather in ${weather.name}</h2>
    <div class="weatherDetail">
      <div class="detail temp">
        <i class="fa-solid fa-temperature-low"></i>
        <h3>Temparature</h3>
        <p>${weather.main.temp}</p>
      </div>
      <div class="detail wind">
        <i class="fa-solid fa-wind"></i>
        <h3>Wind speed</h3>
        <p>${weather.wind.speed}</p>
      </div>
      <div class="detail humidity">
        <i class="fa-solid fa-droplet"></i>
        <h3>Humidity</h3>
        <p>${weather.main.humidity}</p>
      </div>
    </div>
  </div>
</div>`;
}

function displayError() {
  const errorMessage = document.querySelector(".errorMassage");
  errorMessage.classList.add("show");
  const closeError = document.querySelector(".quitError");
  closeError.addEventListener("click", function () {
    errorMessage.classList.remove("show");
  });
}

function searchBar() {
  return `<div class="searchBar">
  <div class="inputSearch">
    <input type="text" class="inputKeyword" placeholder="Search city" />
    <button class="searchButton"><i class="fa-solid fa-paper-plane"></i></button>
  </div>
  <div class="errorMassage">
    <div class="errorText">
      <p><i class="fa-solid fa-circle-exclamation" style="margin-right: 10px"></i> ERROR : Please type a city name</p>
    </div>
    <i class="fa-solid fa-xmark quitError"></i>
  </div>
</div>`;
}

function updateIconBackground() {
  let weatherCondition = document.querySelector(".weatherCondition").innerText;
  const background = document.querySelector(".background img");
  const icon = document.querySelector(".currentWeather img");
  if (weatherCondition == "Clear") {
    background.src = "./img/clear.jpg";
    icon.src = "./img/clear.png";
  }
  if (weatherCondition == "Rain") {
    background.src = "./img/rain.jpg";
    icon.src = "./img/rain.png";
  }
  if (weatherCondition == "Clouds") {
    background.src = "./img/clouds.jpg";
    icon.src = "./img/clouds.png";
  }
  if (weatherCondition == "Snow") {
    background.src = "./img/snow.jpg";
    icon.src = "./img/snow.png";
  }
}

document.addEventListener("click", function (element) {
  if (element.target.classList.contains("quitBtn")) {
    location.reload();
  }
});
