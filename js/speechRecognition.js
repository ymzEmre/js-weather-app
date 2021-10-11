const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const rec = new SpeechRecognition();

rec.onresult = (event) => {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  searchBox.value = transcript;
  // readOutLoud(transcript);
};

function recoStart() {
  rec.start();
}

const checkbox = document.getElementById("ios-checkbox");
const calc = () => {
  if (checkbox.checked) {
    localStorage.setItem("autoListen", checkbox.checked);
  } else {
    localStorage.setItem("autoListen", checkbox.checked);
  }
};

const checked = JSON.parse(localStorage.getItem("autoListen"));
if (checked) {
  checkbox.checked = true;
  rec.start();
} else {
  checkbox.checked = false;
  rec.stop();
}

// function readOutLoud(mess) {
//   const speech = new SpeechSynthesisUtterance();

//   speech.text = mess + "hava" + "10 derece";
//   speech.volume = 1;
//   speech.rate = 1;
//   speech.pitch = 1;
//   // console.log(cityTemp.value);
//   window.speechSynthesis.speak(speech);

//   const utterance = new SpeechSynthesisUtterance(speech.text);
//   window.speechSynthesis.speak(utterance);
// }

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
  searchBox.click();
  document.querySelector(".iconMicrophone").classList.add("speechEnd");
  document.querySelector(".iconMicrophone").classList.remove("speechStart");
  console.log("emre");
};
