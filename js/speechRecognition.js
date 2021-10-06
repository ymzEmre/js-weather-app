const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// let searchBox = document.querySelector(".searchBox");

const rec = new SpeechRecognition();

rec.onresult = function (event) {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  searchBox.value = transcript;
};

function recoStart() {
  rec.start();
}

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
