const weatherApiUrl = "https://api.openweathermap.org/data/2.5/";
const weatherApiKey = "bfe61cb95c2da5f72b6fadb2bb5dc8dd";

const searchBar = document.getElementById("searchBar");

const setQuery = (e) => {
  getResult(searchBar.value);
  console.log(searchBar.value);
};

const getResult = (cityName) => {
  let query = `${weatherApiUrl}weather?q=${cityName}&appid=${weatherApiKey}&units=metric`;
  fetch(query)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult)

    .catch((err) => {
      console.log(err);
    });
};

const displayResult = (result) => {
  console.log(result);
  let city = document.querySelector(".city");
  let temp = document.querySelector(".temp");
  let desc = document.querySelector(".desc");
  let minmax = document.querySelector(".minmax");

  city.innerText = `${result.name}, ${result.sys.country}`;

  temp.innerText = `${Math.round(result.main.temp)} °C`;

  desc.innerText = result.weather[0].description;

  minmax.innerText = `${Math.round(result.main.temp_min)} / ${Math.round(result.main.temp_max)}`;

  console.log(result);

  var x = document.getElementById("soundSunny");
  var x2 = document.getElementById("soundRainy");

  function playAudio() {
    x.play();
  }

  function pauseAudio() {
    x.pause();
  }

  function playAudio2() {
    x2.play();
  }

  function pauseAudio2() {
    x2.pause();
  }

  let getDesc = result.weather[0].main;

  switch (getDesc) {
    case (getDesc = "Clear"):
      document.querySelector(".bodyClass").style.backgroundImage = "url('./assets/img/clear-sky-daylight.jpg')";
      break;

    case (getDesc = "Clouds"):
      document.querySelector(".bodyClass").style.backgroundImage = "url('./assets/img/clouds.jpg')";
      break;

    case (getDesc = "Rain"):
      document.querySelector(".bodyClass").style.backgroundImage = "url('./assets/img/rainy.gif')";
      break;

    case (getDesc = "Snow"):
      document.querySelector(".bodyClass").style.backgroundImage = "url('./assets/img/snow.gif')";
      break;

    case (getDesc = "Mist"):
      document.querySelector(".bodyClass").style.backgroundImage = "url('./assets/img/mist.png')";
      break;

    case (getDesc = "Thunderstorm"):
      document.querySelector(".bodyClass").style.backgroundImage = "url('./assets/img/thunderstorm.jpg')";
      break;
    default:
  }
};

// searchBar.addEventListener("click", setQuery);

"click keyup".split(" ").forEach(function (e) {
  searchBar.addEventListener(e, setQuery, false);
});
