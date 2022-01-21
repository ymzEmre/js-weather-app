// require('dotenv').config();

const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/';
const weatherApiKey = process.env.API_KEY;
const bodyEl = document.getElementsByTagName('body')[0];

const unitDegreeSwitchEl = document.getElementById('unit-degree-switch');
const searchInputEl = document.querySelector('.search-input');

const switchUnitDegree = () => {
  setTimeout(() => {
    currentUnitDegree = unitDegreeSwitchEl.checked ? 'imperial' : 'metric';
    searchInputEl.click();

    if (unitDegreeSwitchEl.checked) {
      localStorage.setItem('currentUnitDegree', 'imperial');
    } else {
      localStorage.setItem('currentUnitDegree', 'metric');
    }
  }, 300);
};

const getCurrentUnitDegree = localStorage.getItem('currentUnitDegree');

if (getCurrentUnitDegree == 'imperial') {
  unitDegreeSwitchEl.checked = true;
  switchUnitDegree();
} else {
  unitDegreeSwitchEl.checked = false;
  switchUnitDegree();
}

const setQuery = (e) => {
  fetchData(searchInputEl.value);
};

const cityResultSectionEl = document.querySelector('.cityResultSection');
const cityResultInfoMainEl = document.querySelector('.cityResultInfoMain');
const cityNameEl = document.querySelector('.cityName');
const cityTempEl = document.querySelector('.cityTemp');
const cityDescEl = document.querySelector('.cityDesc');
const cityResultOtherInfoEl = document.querySelector('.cityResultOtherInfo');
const cityMinMaxEl = document.querySelector('.cityMinMax');
const cityHumidityEl = document.querySelector('.cityHumidity');
const cityWindSpeedEl = document.querySelector('.cityWindSpeed');
const citySunriseEl = document.querySelector('.citySunrise');
const citySunsetEl = document.querySelector('.citySunset');
const cityNotFoundEl = document.querySelector('.cityNotFound');
const installSection = document.querySelector('.installSection p');
const cityIconEl = document.querySelectorAll('.cityResultOtherInfo i');

const fetchData = (weatherApiCity) => {
  const query = `${weatherApiUrl}weather?q=${weatherApiCity}&appid=${weatherApiKey}&units=${currentUnitDegree}`;

  cityNameEl.textContent = '';
  cityTempEl.textContent = '';
  cityDescEl.textContent = '';
  cityMinMaxEl.textContent = '';
  cityNotFoundEl.textContent = '';
  cityHumidityEl.textContent = '';
  citySunriseEl.textContent = '';
  citySunsetEl.textContent = '';
  cityWindSpeedEl.textContent = '';

  [...cityIconEl].forEach((el) => {
    el.classList.add('visible-off');
  });

  installSection.classList.remove('black');
  cityResultSectionEl.classList.remove('white');

  if (searchInputEl.value.length > 2) {
    fetch(query)
      .then((weather) => {
        return weather.json();
      })
      .then(displayResult)
      .catch(() => {
        if (searchInputEl.value.length < 3) {
          cityResultSectionEl.classList.remove('cityResultSectionDisplay');
        } else if (searchInputEl.value.length > 2) {
          cityNotFoundEl.textContent = 'City not found';
          cityResultInfoMainEl.classList.add('displayNone');
          cityResultOtherInfoEl.classList.add('displayNone');
          cityResultSectionEl.classList.add('cityResultSectionDisplay');
        } else {
          cityResultInfoMainEl.classList.remove('displayNone');
          cityResultOtherInfoEl.classList.remove('displayNone');
        }
        bodyEl.style.backgroundImage = "url('assets/img/home-page.jpg')";
      });
  }
};

const testFunction = (e) => {
  return console.log(e + '++++test');
};

const msToTime = (msGetValue) => {
  let getMs = new Date(msGetValue * 1000);
  let getHours = getMs.getHours();
  let getMinutes = getMs.getMinutes();
  let hours = getHours > 9 ? getHours : '0' + getHours;
  let minutes = getMinutes > 9 ? getMinutes : '0' + getMinutes;
  return hours + ':' + minutes;
};

const playAndPauseAudio = (pauseAudio, playAudio, backgroundURL) => {
  const pauseAudioEl = document.querySelectorAll(`audio:not(#${pauseAudio})`);
  [...pauseAudioEl].forEach((el) => {
    el.pause();
  });

  document.getElementById(`${playAudio}`).play();
  bodyEl.style.backgroundImage = `url('${backgroundURL}')`;
};

const displayResult = (result) => {
  const unitDegree = unitDegreeSwitchEl.checked ? '°F' : '°C';
  const unitWindSpeed = unitDegreeSwitchEl.checked ? 'mph' : 'km/h';

  let cityWindSpeed = Math.round(result.wind.speed * 3.6);

  cityNameEl.textContent = `${result.name}, ${result.sys.country}`;
  cityTempEl.textContent = `${Math.round(result.main.temp)} ${unitDegree}`;
  cityDescEl.textContent = result.weather[0].description;
  cityMinMaxEl.textContent = `${Math.round(result.main.temp_min)} / ${Math.round(result.main.temp_max)}`;
  cityHumidityEl.textContent = `${result.main.humidity}%`;
  cityWindSpeedEl.textContent = `${cityWindSpeed} ${unitWindSpeed}`;
  citySunriseEl.textContent = msToTime(`${result.sys.sunrise}`);
  citySunsetEl.textContent = msToTime(`${result.sys.sunset}`);

  installSection.classList.add('black');
  cityResultInfoMainEl.classList.remove('displayNone');
  cityResultOtherInfoEl.classList.remove('displayNone');

  [...cityIconEl].forEach((el) => {
    el.classList.remove('visible-off');
  });

  cityResultSectionEl.classList.add('cityResultSectionDisplay');

  switch (getDesc) {
    case (getDesc = 'Clear'):
      if (currentTime > getCitySunrise) {
        bodyEl.style.backgroundImage = "url('assets/weather/clear-daytime.jpg')";
        soundClearDayTimeEl.play();
      } else {
        bodyEl.style.backgroundImage = "url('assets/weather/clear-nighttime.jpg')";
        soundClearNightTimeEl.play();
        installSection.classList.remove('black');
        checkboxSectionLabel[0].classList.remove('black');
        checkboxSectionLabel[1].classList.remove('black');
        cityResultSectionEl.classList.add('white');
      }

      let notsoundClear = document.querySelectorAll('audio:not(#soundClearDayTime):not(#soundClearNightTime)');
      [...notsoundClear].forEach((el) => {
        el.pause();
      });
      break;

    case (getDesc = 'Clouds'):
      bodyEl.style.backgroundImage = "url('assets/weather/cloudy.jpg')";
      soundMistyEl.play();

      let notsoundMisty = document.querySelectorAll('audio:not(#soundMisty)');
      [...notsoundMisty].forEach((el) => {
        el.pause();
      });
      break;

    case (getDesc = 'Rain'):
      bodyEl.style.backgroundImage = "url('assets/weather/rainy.jpg')";
      soundRainyEl.play();

      let notsoundRainyEl = document.querySelectorAll('audio:not(#soundRainy)');
      [...notsoundRainyEl].forEach((el) => {
        el.pause();
      });

      break;

    case (getDesc = 'Snow'):
      bodyEl.style.backgroundImage = "url('assets/weather/snowy.jpg')";
      soundSnowyEl.play();

      let notsoundSnowyEl = document.querySelectorAll('audio:not(#soundSnowy)');
      [...notsoundSnowyEl].forEach((el) => {
        el.pause();
      });
      break;

    case (getDesc = 'Mist'):
      bodyEl.style.backgroundImage = "url('assets/weather/misty.jpg')";
      soundMistyEl.play();

      let notsoundMistyEl = document.querySelectorAll('audio:not(#soundMisty)');
      [...notsoundMistyEl].forEach((el) => {
        el.pause();
      });

      break;

    case (getDesc = 'Thunderstorm'):
      bodyEl.style.backgroundImage = "url('assets/weather/thunderstorm.jpg')";
      soundThunderStormEl.play();

      let notsoundThunderStormEl = document.querySelectorAll('audio:not(#soundThunderStorm)');
      [...notsoundThunderStormEl].forEach((el) => {
        el.pause();
      });
      break;
    default:
  }
};

'click keyup'.split(' ').forEach(function (e) {
  searchInputEl.addEventListener(e, setQuery, false);
});
