const weatherApiUrl = "https://api.openweathermap.org/data/2.5/";
const weatherApiKey = "bfe61cb95c2da5f72b6fadb2bb5dc8dd";

const searchBar = document.getElementById("searchBar");

const setQuery = (e) => {
  // if (e.keyCode == "13") {
  getResult(searchBar.value);
  console.log(searchBar.value);
  // }
};

const getResult = (cityName) => {
  let query = `${weatherApiUrl}weather?q=${cityName}&appid=${weatherApiKey}&units=metric`;
  fetch(query)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult)

    .catch((err) => {
      // document.querySelector('.app').style.backgroundColor = '#fff';\
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

  let getDesc = result.weather[0].main;

  var x = document.getElementById("myAudio");
  var x2 = document.getElementById("myAudio2");

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

  // açık
  // kapalı
  // az bulutlu

  switch (getDesc) {
    case (getDesc = "Clear"):
      pauseAudio2();
      playAudio();
      document.querySelector(".app").style.backgroundImage = "url('./assets/img/sunny.jpg')";
      break;

    case (getDesc = "Clouds"):
      pauseAudio();
      playAudio2();
      document.querySelector(".app").style.backgroundImage = "url('./assets/img/clouds.jpg')";

      break;

    case (getDesc = "Rain"):
      document.querySelector(".app").style.backgroundImage = "url('./assets/img/rainy.gif')";

      break;

    default:

    // document.body.style.backgroundColor = "red";
  }
};

// searchBar.addEventListener("click", setQuery);

"click keyup".split(" ").forEach(function (e) {
  searchBar.addEventListener(e, setQuery, false);
});
