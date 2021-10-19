const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const rec = new SpeechRecognition();

rec.onresult = (event) => {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  searchBox.value = transcript;
  readOutLoud(transcript);
};

function recoStart() {
  rec.start();
}

const checkboxSpeechRec = document.getElementById("checkboxSpeechRec");

const saveSpeechRecValue = () => {
  if (checkboxSpeechRec) {
    localStorage.setItem("autoListen", checkboxSpeechRec.checked);
  } else {
    localStorage.setItem("autoListen", checkboxSpeechRec.checked);
  }
};

const getSpeechRecValue = JSON.parse(localStorage.getItem("autoListen"));

if (getSpeechRecValue) {
  checkboxSpeechRec.checked = true;
  rec.start();
} else {
  checkboxSpeechRec.checked = false;
  rec.stop();
}

var userLang = navigator.language || navigator.userLanguage;

// console.log(userLang);

function readOutLoud(mess) {
  const speech = new SpeechSynthesisUtterance();

  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  switch (userLang) {
    case (userLang = "tr"):
      setTimeout(() => {
        if (cityTemp.innerText.includes("-")) {
          var replace = cityTemp.innerText.replace("-", "eksi ");
          var arr = [mess + " " + replace];
        } else {
          var arr = [mess + " " + cityTemp.innerText];
        }
        speech.text = arr;
        window.speechSynthesis.speak(speech);
      }, 300);
      break;

    case (userLang = "en-US"):
      setTimeout(() => {
        if (cityTemp.innerText.includes("-")) {
          var replace = cityTemp.innerText.replace("-", "minus ");
          var arr = [mess + " " + replace];
        } else {
          var arr = [mess + " " + cityTemp.innerText];
        }
        speech.text = arr;
        window.speechSynthesis.speak(speech);
      }, 300);
      break;

    default:
      break;
  }

  // const utterance = new SpeechSynthesisUtterance(speech.text);
  // window.speechSynthesis.speak(utterance);
}

// setTimeout(() => {
//   readOutLoud();
// }, 300);

const micStop = () => {
  setTimeout(() => {
    rec.stop();
  }, 3000);
};

document.querySelector(".iconMicrophone").addEventListener("click", recoStart);

rec.onstart = (e) => {
  document.querySelector(".iconMicrophone").classList.add("speechStart");
  document.querySelector(".iconMicrophone").classList.remove("speechEnd");
  micStop();
};

rec.onend = (e) => {
  setQuery();
  document.querySelector(".iconMicrophone").classList.add("speechEnd");
  document.querySelector(".iconMicrophone").classList.remove("speechStart");
};
