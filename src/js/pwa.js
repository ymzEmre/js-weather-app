// const installButton = document.querySelector(".installSection");
// const installButton2 = document.querySelector(".searchContainer");

// let beforeInstallPromptEvent;

// window.addEventListener("beforeinstallprompt", function (e) {
//   e.preventDefault();
//   beforeInstallPromptEvent = e;
//   installButton.style.display = "flex";
//   installButton.addEventListener("click", function () {
//     e.prompt();
//   });
//   installButton.hidden = false;
// });
// installButton.addEventListener("click", function () {
//   beforeInstallPromptEvent.prompt();
// });

var promptEvent;

window.addEventListener("beforeinstallprompt", function (e) {
  e.preventDefault();
  promptEvent = e;
  listenToUserAction();
});

function listenToUserAction() {
  const installBtn = document.querySelector(".installSection");
  installBtn.style.display = "flex";

  installBtn.addEventListener("click", presentAddToHome);
}

function presentAddToHome() {
  promptEvent.prompt();
  // promptEvent.userChoice.then((choice) => {
  //   if (choice.outcome === "accepted") {
  //     console.log("User accepted");
  //   } else {
  //     console.log("User dismissed");
  //   }
  // });
}
