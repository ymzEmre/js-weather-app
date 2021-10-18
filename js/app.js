const weatherApiUrl = "https://api.openweathermap.org/data/2.5/";
const weatherApiKey = "9dc471d76a73a52a9fb31b72dec034bd";

const searchBox = document.querySelector(".searchBox");

const checkboxDegreeUnit = document.getElementById("checkboxDegreeUnit");

checkboxDegreeUnit.checked = false;

currentDegreeUnit = "metric";

const changeDegreeUnit = () => {
  currentDegreeUnit = checkboxDegreeUnit.checked ? "imperial" : "metric";
  searchBox.click();
  if (checkboxDegreeUnit.checked) {
    localStorage.setItem("currentDegreeUnit", "imperial");
  } else {
    localStorage.setItem("currentDegreeUnit", "metric");
  }
};

const getDegreeUnitValue = localStorage.getItem("currentDegreeUnit");
if (getDegreeUnitValue == "imperial") {
  checkboxDegreeUnit.checked = true;
  changeDegreeUnit();
} else {
  checkboxDegreeUnit.checked = false;
  changeDegreeUnit();
}

const bodyClass = document.querySelector(".bodyClass");
const cityName = document.querySelector(".cityName");
const cityTemp = document.querySelector(".cityTemp");
const cityDesc = document.querySelector(".cityDesc");
const cityMinMax = document.querySelector(".cityMinMax");
const cityHumidity = document.querySelector(".cityHumidity");
const citySunrise = document.querySelector(".citySunrise");
const citySunset = document.querySelector(".citySunset");
const cityWindSpeed = document.querySelector(".cityWindSpeed");
const cityNotFound = document.querySelector(".cityNotFound");

const cityMain = document.querySelector(".cityMain");
const cityData = document.querySelector(".cityData");

const cityIcon = document.querySelectorAll(".cityData i");

const cityDetail = document.querySelector(".cityDetail");

const setQuery = (e) => {
  getResult(searchBox.value);
};

const getResult = (weatherApiCity) => {
  let query = `${weatherApiUrl}weather?q=${weatherApiCity}&appid=${weatherApiKey}&units=${this.currentDegreeUnit}`;

  cityName.innerText = "";
  cityTemp.innerText = "";
  cityDesc.innerText = "";
  cityMinMax.innerText = "";
  cityNotFound.innerText = "";
  cityHumidity.innerText = "";
  citySunrise.innerText = "";
  citySunset.innerText = "";
  cityWindSpeed.innerText = "";
  for (i = 0; i < cityIcon.length; i++) {
    cityIcon[i].classList.add("displayOff");
  }

  fetch(query)
    .then((weather) => {
      return weather.json();
    })

    .then(displayResult)

    .catch((err) => {
      if (searchBox.value.length > 2) {
        cityNotFound.innerText = "City not found";
        cityMain.classList.add("displayNone");
        cityData.classList.add("displayNone");
      } else {
        cityDetail.classList.remove("polat");

        // cityMain.classList.remove("displayNone");
        // cityData.classList.remove("displayNone");
      }
      bodyClass.style.backgroundImage = "url('./assets/img/bg-wallpaper1.jpg')";
      document.querySelector(".section").classList.remove("section-city-finded");
      soundClearSky.pause();
      soundRain.pause();
      soundSnow.pause();
      soundSnow.pause();
      soundStorm.pause();
      soundMist.pause();
      // cityMain.classList.add("displayNone");
      // cityData.classList.add("displayNone");
    });
};

const displayResult = (result) => {
  let conta = checkboxDegreeUnit.checked ? "°F" : "°C";

  cityName.innerText = `${result.name}, ${result.sys.country}`;
  cityTemp.innerText = `${Math.round(result.main.temp)} ${conta}`;
  cityDesc.innerText = result.weather[0].description;
  cityMinMax.innerText = `${Math.round(result.main.temp_min)} / ${Math.round(result.main.temp_max)}`;
  cityHumidity.innerText = `${result.main.humidity}%`;
  cityWindSpeed.innerText = `${result.wind.speed}`;
  citySunrise.innerText = tm(`${result.sys.sunrise}`);
  citySunset.innerText = tm(`${result.sys.sunset}`);

  cityMain.classList.remove("displayNone");
  cityData.classList.remove("displayNone");

  for (i = 0; i < cityIcon.length; i++) {
    cityIcon[i].classList.remove("displayOff");
  }

  cityDetail.classList.add("polat");

  function tm(unix_tm) {
    var dt = new Date(unix_tm * 1000);
    return dt.getHours() + ":" + dt.getMinutes();
  }

  const soundClearSky = document.getElementById("soundClearSky");
  const soundRain = document.getElementById("soundRain");
  const soundSnow = document.getElementById("soundSnow");
  const soundStorm = document.getElementById("soundStorm");
  const soundMist = document.getElementById("soundMist");

  let getDesc = result.weather[0].main;

  // console.log(result);

  if (getDesc.length > 0) {
    document.querySelector(".section").classList.add("section-city-finded");
    document.querySelector(".section").classList.add("section-city-finded2");
  }

  switch (getDesc) {
    case (getDesc = "Clear"):
      bodyClass.style.backgroundImage = "url('./assets/img/clear-sky-daylight.jpg')";
      soundClearSky.play();
      soundRain.pause();
      soundSnow.pause();
      soundStorm.pause();
      soundMist.pause();
      break;

    case (getDesc = "Clouds"):
      bodyClass.style.backgroundImage = "url('./assets/img/clouds.jpg')";
      soundMist.play();
      soundClearSky.pause();
      soundRain.pause();
      soundSnow.pause();
      soundStorm.pause();

      break;

    case (getDesc = "Rain"):
      bodyClass.style.backgroundImage = "url('./assets/img/rainy.gif')";
      soundRain.play();
      soundClearSky.pause();
      soundSnow.pause();
      soundStorm.pause();
      soundMist.pause();
      break;

    case (getDesc = "Snow"):
      bodyClass.style.backgroundImage = "url('./assets/img/snow.gif')";
      soundSnow.play();
      soundClearSky.pause();
      soundRain.pause();
      soundStorm.pause();
      soundMist.pause();
      break;

    case (getDesc = "Mist"):
      bodyClass.style.backgroundImage = "url('./assets/img/mist.png')";
      soundMist.play();
      soundClearSky.pause();
      soundRain.pause();
      soundSnow.pause();
      soundStorm.pause();
      break;

    case (getDesc = "Thunderstorm"):
      bodyClass.style.backgroundImage = "url('./assets/img/thunderstorm.jpg')";
      soundStorm.play();
      soundClearSky.pause();
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
