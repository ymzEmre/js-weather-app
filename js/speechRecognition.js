const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// let searchBox = document.querySelector(".searchBox");

const rec = new SpeechRecognition();

rec.onresult = function (event) {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  searchBox.value = transcript;
  readOutLoud(transcript);
};

function recoStart() {
  rec.start();
}

// function readOutLoud(mess) {
//   const speech = new SpeechSynthesisUtterance();

//   speech.text = mess + "Derece" + cityTemp.innerHTML;
//   speech.text = cityTemp.value;
//   speech.volume = 1;
//   speech.rate = 1;
//   speech.pitch = 1;
//   console.log(cityTemp.value);
//   window.speechSynthesis.speak(speech);

//   const utterance = new SpeechSynthesisUtterance(speech.text);
//   window.speechSynthesis.speak(utterance);
// }

document.querySelector(".iconMicrophone").addEventListener("click", recoStart);

rec.addEventListener("start", function () {
  document.querySelector(".iconMicrophone").classList.add("speechStart");
  document.querySelector(".iconMicrophone").classList.remove("speechEnd");
});

rec.addEventListener("end", function () {
  searchBox.click();
  document.querySelector(".iconMicrophone").classList.add("speechEnd");
  document.querySelector(".iconMicrophone").classList.remove("speechStart");
});
