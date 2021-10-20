let promptEvent;

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
