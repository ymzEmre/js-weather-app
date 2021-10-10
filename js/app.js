const weatherApiUrl = "https://api.openweathermap.org/data/2.5/";
const weatherApiKey = "bfe61cb95c2da5f72b6fadb2bb5dc8dd";

const bodyClass = document.querySelector(".bodyClass");

let searchBox = document.querySelector(".searchBox");
let cityName = document.querySelector(".cityName");
let cityTemp = document.querySelector(".cityTemp");
let cityDesc = document.querySelector(".cityDesc");
let cityMinMax = document.querySelector(".cityMinMax");
let cityNotFound = document.querySelector(".cityNotFound");

const setQuery = (e) => {
  getResult(searchBox.value);
};

const getResult = (weatherApiCity) => {
  let query = `${weatherApiUrl}weather?q=${weatherApiCity}&appid=${weatherApiKey}&units=metric`;

  cityName.innerText = "";
  cityTemp.innerText = "";
  cityDesc.innerText = "";
  cityMinMax.innerText = "";
  cityNotFound.innerText = "";

  fetch(query)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult)

    .catch((err) => {
      if (searchBox.value.length > 2) {
        cityNotFound.innerText = "City not found";
      }
      bodyClass.style.backgroundImage = "url('./assets/img/4-seasons.jpg')";
      document.querySelector(".section").classList.remove("section-city-finded");
      soundClearSkyDay.pause();
      soundRain.pause();
      soundSnow.pause();
      soundSnow.pause();
      soundStorm.pause();
      soundMist.pause();
    });
};

const displayResult = (result) => {
  cityName.innerText = `${result.name}, ${result.sys.country}`;
  cityTemp.innerText = `${Math.round(result.main.temp)} °C`;
  cityDesc.innerText = result.weather[0].description;
  cityMinMax.innerText = `${Math.round(result.main.temp_min)} / ${Math.round(result.main.temp_max)}`;

  const soundClearSkyDay = document.getElementById("soundClearSkyDay");
  // const soundClearSkyNight = document.getElementById("soundClearSkyNight");
  const soundRain = document.getElementById("soundRain");
  const soundSnow = document.getElementById("soundSnow");
  const soundStorm = document.getElementById("soundStorm");
  const soundMist = document.getElementById("soundMist");

  let getDesc = result.weather[0].main;

  if (getDesc.length > 0) {
    document.querySelector(".section").classList.add("section-city-finded");
    document.querySelector(".section").classList.add("section-city-finded2");
    document.querySelector(".content").classList.add("content2");
  }

  switch (getDesc) {
    case (getDesc = "Clear"):
      bodyClass.style.backgroundImage = "url('./assets/img/clear-sky-daylight.jpg')";
      soundClearSkyDay.play();
      soundRain.pause();
      soundSnow.pause();
      soundStorm.pause();
      soundMist.pause();
      break;

    case (getDesc = "Clouds"):
      bodyClass.style.backgroundImage = "url('./assets/img/clouds.jpg')";
      soundMist.play();
      soundClearSkyDay.pause();
      soundRain.pause();
      soundSnow.pause();
      soundStorm.pause();

      break;

    case (getDesc = "Rain"):
      bodyClass.style.backgroundImage = "url('./assets/img/rainy.gif')";
      soundRain.play();
      soundClearSkyDay.pause();
      soundSnow.pause();
      soundStorm.pause();
      soundMist.pause();
      break;

    case (getDesc = "Snow"):
      bodyClass.style.backgroundImage = "url('./assets/img/snow.gif')";
      soundSnow.play();
      soundClearSkyDay.pause();
      soundRain.pause();
      soundStorm.pause();
      soundMist.pause();
      break;

    case (getDesc = "Mist"):
      bodyClass.style.backgroundImage = "url('./assets/img/mist.png')";
      soundMist.play();
      soundClearSkyDay.pause();
      soundRain.pause();
      soundSnow.pause();
      soundStorm.pause();
      break;

    case (getDesc = "Thunderstorm"):
      bodyClass.style.backgroundImage = "url('./assets/img/thunderstorm.jpg')";
      soundStorm.play();
      soundClearSkyDay.pause();
      soundRain.pause();
      soundSnow.pause();
      soundMist.pause();
      break;
    default:
  }
};

"click keyup".split(" ").forEach(function (e) {
  searchBox.addEventListener(e, setQuery, false);
});
