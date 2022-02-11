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
const spinner = document.getElementById('spinner');

const fetchData = (weatherApiCity) => {
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

  const backgroundSoundEl = document.getElementsByTagName('audio');

  if (searchInputEl.value.length <= 2) {
    (bodyEl.style.backgroundImage = "url('assets/img/home-page.jpg')"), cityResultSectionEl.classList.add('visibility-hidden');
    cityResultSectionEl.classList.remove('visibility-hidden');
    cityResultSectionEl.classList.remove('cityResultSectionDisplay');
    [...backgroundSoundEl].forEach((el) => {
      el.pause();
    });
    return;
  }
  spinner.classList.add('visible');

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ city: weatherApiCity, units: currentUnitDegree }),
  };

  fetch('https://ymz-weather.herokuapp.com/', requestOptions)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult)
    .catch(() => {
      cityNotFoundEl.textContent = 'City not found';
      cityResultInfoMainEl.classList.add('displayNone');
      cityResultSectionEl.classList.remove('cityResultSectionDisplay');
      bodyEl.style.backgroundImage = "url('assets/img/home-page.jpg')";
      cityResultSectionEl.classList.add('cityResultSectionDisplay');
      spinner.classList.remove('visible');
      [...backgroundSoundEl].forEach((el) => {
        el.pause();
      });
    });
};

const msToTime = (getTime) => {
  let getMs = new Date(getTime * 1000);
  let getHours = getMs.getHours();
  let getMinutes = getMs.getMinutes();
  let hours = getHours > 9 ? getHours : '0' + getHours;
  let minutes = getMinutes > 9 ? getMinutes : '0' + getMinutes;
  return hours + ':' + minutes;
};

const playAndPauseAudio = (pauseAudio, playAudio, backgroundImage) => {
  const pauseAudioEl = document.querySelectorAll(`audio:not(#${pauseAudio})`);
  [...pauseAudioEl].forEach((el) => {
    el.pause();
  });

  const playAudioEl = document.getElementById(`${playAudio}`);
  playAudioEl.muted = false;
  playAudioEl.play();
  bodyEl.style.backgroundImage = `url('${backgroundImage}')`;
};

const displayResult = (result) => {
  spinner.classList.remove('visible');
  const unitDegree = unitDegreeSwitchEl.checked ? '°F' : '°C';
  const unitWindSpeed = unitDegreeSwitchEl.checked ? 'mph' : 'km/h';

  cityNameEl.textContent = `${result.name}, ${result.sys.country}`;
  cityTempEl.textContent = `${Math.round(result.main.temp)} ${unitDegree}`;
  cityDescEl.textContent = result.weather[0].description;
  cityMinMaxEl.textContent = `${Math.round(result.main.temp_min)} / ${Math.round(result.main.temp_max)}`;
  cityHumidityEl.textContent = `${result.main.humidity}%`;
  cityWindSpeedEl.textContent = `${Math.round(result.wind.speed * 3.6)} ${unitWindSpeed}`;
  citySunriseEl.textContent = msToTime(`${result.sys.sunrise}`);
  citySunsetEl.textContent = msToTime(`${result.sys.sunset}`);

  installSection.classList.add('black');
  cityResultInfoMainEl.classList.remove('displayNone');
  cityResultOtherInfoEl.classList.remove('displayNone');

  [...cityIconEl].forEach((el) => {
    el.classList.remove('visible-off');
  });

  cityResultSectionEl.classList.add('cityResultSectionDisplay');

  const isDayTime = new Date().getHours() > 6 && new Date().getHours() < 18;

  let getCityWeather = result.weather[0].main;

  if (getCityWeather == 'Clear' && isDayTime) return playAndPauseAudio('sound-clear', 'sound-clear', 'assets/weather/clear.jpg');
  if (getCityWeather == 'Clear' && !isDayTime)
    return playAndPauseAudio('sound-clear-night', 'sound-clear-night', 'assets/weather/clear-night.jpg'), (cityResultSectionEl.style.color = '#fff');
  if (getCityWeather == 'Clouds') return playAndPauseAudio('sound-misty', 'sound-misty', 'assets/weather/cloudy.jpg');
  if (getCityWeather == 'Rain') return playAndPauseAudio('sound-rainy', 'sound-rainy', 'assets/weather/rainy.jpg');
  if (getCityWeather == 'Snow') return playAndPauseAudio('sound-snowy', 'sound-snowy', 'assets/weather/snowy.jpg');
  if (getCityWeather == 'Thunderstorm') return playAndPauseAudio('sound-thunderstorm', 'sound-thunderstorm', 'assets/weather/thunderstorm.jpg');
};

'click keyup'.split(' ').forEach(function (e) {
  searchInputEl.addEventListener(e, setQuery, false);
});
