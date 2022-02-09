const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const startRecognition = new SpeechRecognition();

startRecognition.onresult = (event) => {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  searchInputEl.value = transcript;
  readOutLoud(transcript);
};

const autoListenSwitchEl = document.getElementById('checkboxSpeech');

const speechCurrentValue = () => {
  if (autoListenSwitchEl) {
    localStorage.setItem('autoListen', autoListenSwitchEl.checked);
  } else {
    localStorage.setItem('autoListen', autoListenSwitchEl.checked);
  }
};

const getSpeechRecValue = JSON.parse(localStorage.getItem('autoListen'));

if (getSpeechRecValue) {
  autoListenSwitchEl.checked = true;
  setTimeout(() => {
    startRecognition.start();
  }, 2000);
} else {
  autoListenSwitchEl.checked = false;
  startRecognition.stop();
}

const userLang = navigator.language || navigator.userLanguage;

const readOutLoud = (mess) => {
  const feedbackWeather = (lang) => {
    console.log(lang);
    setTimeout(() => {
      if (cityTempEl.innerText.includes('-')) {
        var replace = cityTempEl.innerText.replace('-', `${lang} `);
        var arr = [mess + ' ' + replace];
      } else {
        var arr = [mess + ' ' + cityTempEl.innerText];
      }
      speech.text = arr;
      window.speechSynthesis.speak(speech);
    }, 300);
  };
  const speech = new SpeechSynthesisUtterance();

  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  if (userLang == 'en-US') return feedbackWeather('minus');

  feedbackWeather('eksi');
};

function recoStart() {
  startRecognition.start();
}

const micStop = () => {
  setTimeout(() => {
    startRecognition.stop();
  }, 3000);
};

const searchSectionIconEl = document.querySelector('.searchSection i');

searchSectionIconEl.addEventListener('click', recoStart);

startRecognition.onstart = (e) => {
  searchSectionIconEl.classList.add('speechStart');
  searchSectionIconEl.classList.remove('speechEnd');
  micStop();
};

startRecognition.onend = (e) => {
  setQuery();
  searchSectionIconEl.classList.add('speechEnd');
  searchSectionIconEl.classList.remove('speechStart');

  setTimeout(() => {}, 1000);
};
