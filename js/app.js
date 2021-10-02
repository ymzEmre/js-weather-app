const weatherApiUrl = "https://api.openweathermap.org/data/2.5/";
const weatherApiKey = "bfe61cb95c2da5f72b6fadb2bb5dc8dd";

let searchBar = document.getElementById("searchBar");

const setQuery = (e) => {
  getResult(searchBar.value);
};

const getResult = (cityName) => {
  let query = `${weatherApiUrl}weather?q=${cityName}&appid=${weatherApiKey}&units=metric`;
  let emre = (document.querySelector(".err").innerText = "");

  city.innerText = "";
  temp.innerText = "";
  desc.innerText = "";
  minmax.innerText = "";
  fetch(query)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult)
    .then(emre)

    .catch((err) => {
      console.log(err);
      document.querySelector(".bodyClass").style.backgroundImage = "url('./assets/img/4-seasons.jpg')";
      document.querySelector(".err").innerText = "City non found";
    });
};
let city = document.querySelector(".city");
let temp = document.querySelector(".temp");
let desc = document.querySelector(".desc");
let minmax = document.querySelector(".minmax");

const displayResult = (result) => {
  city.innerText = `${result.name}, ${result.sys.country}`;

  temp.innerText = `${Math.round(result.main.temp)} °C`;

  desc.innerText = result.weather[0].description;

  minmax.innerText = `${Math.round(result.main.temp_min)} / ${Math.round(result.main.temp_max)}`;

  const soundClearSkyDay = document.getElementById("soundClearSkyDay");
  const soundClearSkyNight = document.getElementById("soundClearSkyNight");
  const soundRain = document.getElementById("soundRain");
  const soundSnow = document.getElementById("soundSnow");
  const soundStorm = document.getElementById("soundStorm");
  const soundMist = document.getElementById("soundMist");

  let getDesc = result.weather[0].main;

  switch (getDesc) {
    case (getDesc = "Clear"):
      document.querySelector(".bodyClass").style.backgroundImage = "url('./assets/img/clear-sky-daylight.jpg')";
      soundClearSkyDay.play();
      soundClearSkyNight.pause();
      soundRain.pause();
      soundSnow.pause();
      soundMist.pause();
      break;

    case (getDesc = "Clouds"):
      document.querySelector(".bodyClass").style.backgroundImage = "url('./assets/img/clouds.jpg')";
      soundMist.play();
      soundClearSkyNight.pause();
      soundRain.pause();
      soundSnow.pause();
      soundStorm.pause();
      break;

    case (getDesc = "Rain"):
      document.querySelector(".bodyClass").style.backgroundImage = "url('./assets/img/rainy.gif')";
      soundRain.play();
      soundClearSkyNight.pause();
      soundSnow.pause();
      soundSnow.pause();
      soundStorm.pause();
      soundMist.pause();
      break;

    case (getDesc = "Snow"):
      document.querySelector(".bodyClass").style.backgroundImage = "url('./assets/img/snow.gif')";
      soundSnow.play();
      soundClearSkyNight.pause();
      soundRain.pause();
      soundStorm.pause();
      soundMist.pause();
      break;

    case (getDesc = "Mist"):
      document.querySelector(".bodyClass").style.backgroundImage = "url('./assets/img/mist.png')";
      soundMist.play();
      soundClearSkyNight.pause();
      soundRain.pause();
      soundSnow.pause();
      soundStorm.pause();
      break;

    case (getDesc = "Thunderstorm"):
      document.querySelector(".bodyClass").style.backgroundImage = "url('./assets/img/thunderstorm.jpg')";
      soundStorm.play();
      soundClearSkyNight.pause();
      soundRain.pause();
      soundSnow.pause();
      soundSnow.pause();
      soundMist.pause();
      break;
    default:
  }
};

"click keyup".split(" ").forEach(function (e) {
  searchBar.addEventListener(e, setQuery, false);
});
