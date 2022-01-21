const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const rec = new SpeechRecognition();

rec.onresult = (event) => {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  searchInputEl.value = transcript;
  readOutLoud(transcript);
};

function recoStart() {
  rec.start();
}

const checkboxSpeechEl = document.getElementById('checkboxSpeech');

const speechCurrentValue = () => {
  if (checkboxSpeechEl) {
    localStorage.setItem('autoListen', checkboxSpeechEl.checked);
  } else {
    localStorage.setItem('autoListen', checkboxSpeechEl.checked);
  }
};

const getSpeechRecValue = JSON.parse(localStorage.getItem('autoListen'));

if (getSpeechRecValue) {
  checkboxSpeechEl.checked = true;
  setTimeout(() => {
    rec.start();
  }, 2000);
} else {
  checkboxSpeechEl.checked = false;
  rec.stop();
}

var userLang = navigator.language || navigator.userLanguage;

function readOutLoud(mess) {
  const speech = new SpeechSynthesisUtterance();

  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  switch (userLang) {
    case (userLang = 'tr'):
      setTimeout(() => {
        if (cityTempEl.innerText.includes('-')) {
          var replace = cityTempEl.innerText.replace('-', 'eksi ');
          var arr = [mess + ' ' + replace];
        } else {
          var arr = [mess + ' ' + cityTempEl.innerText];
        }
        speech.text = arr;
        window.speechSynthesis.speak(speech);
      }, 300);
      break;

    case (userLang = 'en-US'):
      setTimeout(() => {
        if (cityTempEl.innerText.includes('-')) {
          var replace = cityTempEl.innerText.replace('-', 'minus ');
          var arr = [mess + ' ' + replace];
        } else {
          var arr = [mess + ' ' + cityTempEl.innerText];
        }
        speech.text = arr;
        window.speechSynthesis.speak(speech);
      }, 300);
      break;

    default:
      break;
  }
}

const micStop = () => {
  setTimeout(() => {
    rec.stop();
  }, 3000);
};

const searchSectionIconEl = document.querySelector('.searchSection i');

searchSectionIconEl.addEventListener('click', recoStart);

rec.onstart = (e) => {
  searchSectionIconEl.classList.add('speechStart');
  searchSectionIconEl.classList.remove('speechEnd');
  micStop();
};

rec.onend = (e) => {
  setQuery();
  searchSectionIconEl.classList.add('speechEnd');
  searchSectionIconEl.classList.remove('speechStart');

  setTimeout(() => {}, 1000);
};
