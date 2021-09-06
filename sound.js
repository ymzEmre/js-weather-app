window.onload = function () {
  autoRecorderFunction();
};

const content = document.querySelector(".content");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const rec = new SpeechRecognition();

rec.onresult = function (event) {
  const current = event.resultIndex;

  const transcript = event.results[current][0].transcript;
  content.value = transcript;
  readOutLoud(transcript);
  document.getElementById("searchBar").click();
};

function recoStart() {
  rec.start();
}

document.getElementById("speech").addEventListener("click", recoStart);

// var autoRecorder;
// function autoRecorderFunction() {
//   autoRecorder = setInterval(recoStart, 1000);
// }

function readOutLoud(mess) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = mess;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  // Speak Person - window.speechSynthesis.speak(speech);

  var source = "https://drive.google.com/file/d/1jv0iMQuFjztvQ8TBBoY9PL2SyEdMr1Yy/view";
  var audio = document.createElement("audio");
  audio.autoplay = true;
  audio.load();

  if (mess.includes("ver mehteri")) {
    console.log("include => ver mehteri");
    audio.addEventListener(
      "load",
      function () {
        audio.play();
      },
      true
    );
    audio.src = source;
  } else if (mess.includes("dur")) {
    function a() {
      audio.pause();
    }
  }
}
