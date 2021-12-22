require("dotenv").config();

const weatherApiKey = "9dc471d76a73a52a9fb31b72dec034bd";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/";

const bodyEl = document.getElementsByTagName("body")[0];

const checkboxDegreeUnitEl = document.getElementById("checkboxUnitDegree");
const searchBoxEl = document.querySelector(".searchBox");

const checkboxSectionSpan = document.querySelectorAll(".checkboxSection p span");

const changeUnitDegree = () => {
  setTimeout(() => {
    currentUnitDegree = checkboxDegreeUnitEl.checked ? "imperial" : "metric";
    searchBoxEl.click();
    if (checkboxDegreeUnitEl.checked) {
      localStorage.setItem("currentUnitDegree", "imperial");
    } else {
      localStorage.setItem("currentUnitDegree", "metric");
    }
  }, 300);
};

const getDegreeUnitValue = localStorage.getItem("currentUnitDegree");
if (getDegreeUnitValue == "imperial") {
  checkboxDegreeUnitEl.checked = true;
  changeUnitDegree();
} else {
  checkboxDegreeUnitEl.checked = false;
  changeUnitDegree();
}

const setQuery = (e) => {
  getResult(searchBoxEl.value);
};

const cityResultSectionEl = document.querySelector(".cityResultSection");

const cityResultInfoMainEl = document.querySelector(".cityResultInfoMain");
const cityNameEl = document.querySelector(".cityName");
const cityTempEl = document.querySelector(".cityTemp");
const cityDescEl = document.querySelector(".cityDesc");

const cityResultInfoOtherEl = document.querySelector(".cityResultInfoOther");
const cityIconEl = document.querySelectorAll(".cityResultInfoOther i");
const cityMinMaxEl = document.querySelector(".cityMinMax");
const cityHumidityEl = document.querySelector(".cityHumidity");
const cityWindSpeedEl = document.querySelector(".cityWindSpeed");
const citySunriseEl = document.querySelector(".citySunrise");
const citySunsetEl = document.querySelector(".citySunset");
const cityNotFoundEl = document.querySelector(".cityNotFound");

const checkboxSectionLabel = document.querySelectorAll(".checkboxSection p");

const installSection = document.querySelector(".installSection p");

const soundClearDayTimeEl = document.getElementById("soundClearDayTime");
const soundClearNightTimeEl = document.getElementById("soundClearNightTime");
const soundRainyEl = document.getElementById("soundRainy");
const soundSnowyEl = document.getElementById("soundSnowy");
const soundMistyEl = document.getElementById("soundMisty");
const soundThunderStormEl = document.getElementById("soundThunderStorm");

const getResult = (weatherApiCity) => {
  let query = `${weatherApiUrl}weather?q=${weatherApiCity}&appid=${weatherApiKey}&units=${currentUnitDegree}`;

  cityNameEl.innerText = "";
  cityTempEl.innerText = "";
  cityDescEl.innerText = "";
  cityMinMaxEl.innerText = "";
  cityNotFoundEl.innerText = "";
  cityHumidityEl.innerText = "";
  citySunriseEl.innerText = "";
  citySunsetEl.innerText = "";
  cityWindSpeedEl.innerText = "";

  for (i = 0; i < cityIconEl.length; i++) {
    cityIconEl[i].classList.add("displayOff");
  }

  checkboxSectionLabel[0].classList.remove("black");
  checkboxSectionLabel[1].classList.remove("black");
  installSection.classList.remove("black");
  cityResultSectionEl.classList.remove("white");

  fetch(query)
    .then((weather) => {
      return weather.json();
    })

    .then(displayResult)

    .catch((err) => {
      if (searchBoxEl.value.length < 3) {
        cityResultSectionEl.classList.remove("cityResultSectionDisplay");
      } else if (searchBoxEl.value.length > 2) {
        cityNotFoundEl.innerText = "City not found";
        cityResultInfoMainEl.classList.add("displayNone");
        cityResultInfoOtherEl.classList.add("displayNone");
        cityResultSectionEl.classList.add("cityResultSectionDisplay");
      } else {
        cityResultInfoMainEl.classList.remove("displayNone");
        cityResultInfoOtherEl.classList.remove("displayNone");
      }
      bodyEl.style.backgroundImage = "url('src/assets/img/home-page.jpg')";
      soundClearDayTimeEl.pause();
      soundClearNightTimeEl.pause();
      soundRainyEl.pause();
      soundSnowyEl.pause();
      soundMistyEl.pause();
      soundThunderStormEl.pause();
    });
};

const displayResult = (result) => {
  const unitDegree = checkboxDegreeUnitEl.checked ? "°F" : "°C";

  const unitWindSpeed = checkboxDegreeUnitEl.checked ? "mph" : "km/h";

  const msToTime = (msGetValue) => {
    let getMs = new Date(msGetValue * 1000);

    let getHours = getMs.getHours();
    let getMinutes = getMs.getMinutes();

    let hours = getHours > 9 ? getHours : "0" + getHours;
    let minutes = getMinutes > 9 ? getMinutes : "0" + getMinutes;

    return hours + ":" + minutes;
  };

  let cityWindSpeed = Math.round(result.wind.speed * 3.6);

  if (checkboxDegreeUnitEl.checked) {
    cityWindSpeed = Math.round(result.wind.speed);
  }

  cityNameEl.innerText = `${result.name}, ${result.sys.country}`;
  cityTempEl.innerText = `${Math.round(result.main.temp)} ${unitDegree}`;
  cityDescEl.innerText = result.weather[0].description;
  cityMinMaxEl.innerText = `${Math.round(result.main.temp_min)} / ${Math.round(result.main.temp_max)}`;
  cityHumidityEl.innerText = `${result.main.humidity}%`;
  cityWindSpeedEl.innerText = cityWindSpeed + " " + unitWindSpeed;
  citySunriseEl.innerText = msToTime(`${result.sys.sunrise}`);
  citySunsetEl.innerText = msToTime(`${result.sys.sunset}`);

  checkboxSectionLabel[0].classList.add("black");
  checkboxSectionLabel[1].classList.add("black");
  installSection.classList.add("black");

  cityResultInfoMainEl.classList.remove("displayNone");
  cityResultInfoOtherEl.classList.remove("displayNone");

  for (i = 0; i < cityIconEl.length; i++) {
    cityIconEl[i].classList.remove("displayOff");
  }

  cityResultSectionEl.classList.add("cityResultSectionDisplay");

  let getDesc = result.weather[0].main;

  if (getDesc.length > 0) {
    cityNotFoundEl.innerText = "";
  }

  let currentTime = new Date().toLocaleTimeString("en-US", { hour12: false, hour: "numeric", minute: "numeric" });

  let getCitySunrise = msToTime(result.sys.sunrise);

  switch (getDesc) {
    case (getDesc = "Clear"):
      if (currentTime > getCitySunrise) {
        // dayTime
        bodyEl.style.backgroundImage = "url('src/assets/weather/clear-daytime.jpg')";
        soundClearDayTimeEl.play();
      } else {
        // nightTime

        bodyEl.style.backgroundImage = "url('src/assets/weather/clear-nighttime.jpg')";
        soundClearNightTimeEl.play();

        installSection.classList.remove("black");
        checkboxSectionLabel[0].classList.remove("black");
        checkboxSectionLabel[1].classList.remove("black");
        cityResultSectionEl.classList.add("white");
      }

      let notsoundClear = document.querySelectorAll("audio:not(#soundClearDayTime):not(#soundClearNightTime)");
      for (let i = 0; i < notsoundClear.length; i++) {
        notsoundClear[i].pause();
      }
      break;

    case (getDesc = "Clouds"):
      bodyEl.style.backgroundImage = "url('src/assets/weather/cloudy.jpg')";
      soundMistyEl.play();

      let notsoundMisty = document.querySelectorAll("audio:not(#soundMisty)");
      for (let i = 0; i < notsoundMisty.length; i++) {
        notsoundMisty[i].pause();
      }
      break;

    case (getDesc = "Rain"):
      bodyEl.style.backgroundImage = "url('src/assets/weather/rainy.jpg')";
      soundRainyEl.play();

      let notsoundRainyEl = document.querySelectorAll("audio:not(#soundRainy)");
      for (let i = 0; i < notsoundRainyEl.length; i++) {
        notsoundRainyEl[i].pause();
      }
      break;

    case (getDesc = "Snow"):
      bodyEl.style.backgroundImage = "url('src/assets/weather/snowy.jpg')";
      soundSnowyEl.play();

      let notsoundSnowyEl = document.querySelectorAll("audio:not(#soundSnowy)");
      for (let i = 0; i < notsoundSnowyEl.length; i++) {
        notsoundSnowyEl[i].pause();
      }
      break;

    case (getDesc = "Mist"):
      bodyEl.style.backgroundImage = "url('src/assets/weather/misty.jpg')";
      soundMistyEl.play();

      let notsoundMistyEl = document.querySelectorAll("audio:not(#soundMisty)");
      for (let i = 0; i < notsoundMistyEl.length; i++) {
        notsoundMistyEl[i].pause();
      }

      break;

    case (getDesc = "Thunderstorm"):
      bodyEl.style.backgroundImage = "url('src/assets/weather/thunderstorm.jpg')";
      soundThunderStormEl.play();

      let notsoundThunderStormEl = document.querySelectorAll("audio:not(#soundThunderStorm)");
      for (let i = 0; i < notsoundThunderStormEl.length; i++) {
        notsoundThunderStormEl[i].pause();
      }
      break;
    default:
  }
};

"click keyup".split(" ").forEach(function (e) {
  searchBoxEl.addEventListener(e, setQuery, false);
});
