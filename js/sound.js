const content = document.querySelector(".content");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const rec = new SpeechRecognition();

rec.onresult = function (event) {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  content.value = transcript;
  // readOutLoud(transcript);
};

function recoStart() {
  rec.start();
}

document.getElementById("speech").addEventListener("click", recoStart);

rec.addEventListener("end", function () {
  document.getElementById("searchBar").click();
});
