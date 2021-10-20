const weatherApiUrl = "https://api.openweathermap.org/data/2.5/";
const weatherApiKey = "bfe61cb95c2da5f72b6fadb2bb5dc8dd";
// const weatherApiKey = "bfe61cb95c2da5f72b6fadb2bb5dc8dd";

const bodyEl = document.getElementsByTagName("body")[0];

const checkboxDegreeUnitEl = document.getElementById("checkboxUnitDegree");
const searchBoxEl = document.querySelector(".searchBox");

const changeUnitDegree = () => {
  currentUnitDegree = checkboxDegreeUnitEl.checked ? "imperial" : "metric";
  searchBoxEl.click();
  if (checkboxDegreeUnitEl.checked) {
    localStorage.setItem("currentUnitDegree", "imperial");
  } else {
    localStorage.setItem("currentUnitDegree", "metric");
  }
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

const soundSunnyEl = document.getElementById("soundSunny");
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
      soundSunnyEl.pause();
      soundRainyEl.pause();
      soundSnowyEl.pause();
      soundMistyEl.pause();
      soundThunderStormEl.pause();
    });
};

const displayResult = (result) => {
  const unitDegree = checkboxDegreeUnitEl.checked ? "°F" : "°C";

  const msToTime = (msGetValue) => {
    var ms = new Date(msGetValue * 1000);
    return ms.getHours() + ":" + ms.getMinutes();
  };

  cityNameEl.innerText = `${result.name}, ${result.sys.country}`;
  cityTempEl.innerText = `${Math.round(result.main.temp)} ${unitDegree}`;
  cityDescEl.innerText = result.weather[0].description;
  cityMinMaxEl.innerText = `${Math.round(result.main.temp_min)} / ${Math.round(result.main.temp_max)}`;
  cityHumidityEl.innerText = `${result.main.humidity}%`;
  cityWindSpeedEl.innerText = `${result.wind.speed}`;
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

  // console.log(result);

  if (getDesc.length > 0) {
    cityNotFoundEl.innerText = "";
    // readOutLoud(searchBoxEl.value);
  }

  switch (getDesc) {
    case (getDesc = "Clear"):
      bodyEl.style.backgroundImage = "url('src/assets/weather/sunny.jpg')";
      soundSunnyEl.play();
      soundRainyEl.pause();
      soundSnowyEl.pause();
      soundMistyEl.pause();
      soundThunderStormEl.pause();
      break;

    case (getDesc = "Clouds"):
      bodyEl.style.backgroundImage = "url('src/assets/weather/cloudy.jpg')";
      soundMistyEl.play();
      soundSunnyEl.pause();
      soundRainyEl.pause();
      soundSnowyEl.pause();
      soundThunderStormEl.pause();
      break;

    case (getDesc = "Rain"):
      bodyEl.style.backgroundImage = "url('src/assets/weather/rainy.jpg')";
      soundRainyEl.play();
      soundSunnyEl.pause();
      soundSnowyEl.pause();
      soundMistyEl.pause();
      soundThunderStormEl.pause();
      break;

    case (getDesc = "Snow"):
      bodyEl.style.backgroundImage = "url('src/assets/weather/snowy.jpg')";
      soundSnowyEl.play();
      soundSunnyEl.pause();
      soundRainyEl.pause();
      soundMistyEl.pause();
      soundThunderStormEl.pause();
      break;

    case (getDesc = "Mist"):
      bodyEl.style.backgroundImage = "url('src/assets/weather/misty.jpg')";
      soundMistyEl.play();
      soundSunnyEl.pause();
      soundRainyEl.pause();
      soundSnowyEl.pause();
      soundThunderStorm.pause();
      break;

    case (getDesc = "Thunderstorm"):
      bodyEl.style.backgroundImage = "url('src/assets/weather/thunderstorm.jpg')";
      soundThunderStormEl.play();
      soundSunnyEl.pause();
      soundRainyEl.pause();
      soundSnowyEl.pause();
      soundMistyEl.pause();
      break;
    default:
  }
};

"click keyup".split(" ").forEach(function (e) {
  searchBoxEl.addEventListener(e, setQuery, false);
});
