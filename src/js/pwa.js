const installButton = document.querySelector(".installSection");
const installButton2 = document.querySelector(".searchContainer");
searchBoxEl.click();

let beforeInstallPromptEvent;

window.addEventListener("beforeinstallprompt", function (e) {
  e.preventDefault();
  beforeInstallPromptEvent = e;
  installButton.style.display = "flex";
  installButton.addEventListener("click", function () {
    e.prompt();
  });
  installButton.hidden = false;
});
installButton.addEventListener("click", function () {
  beforeInstallPromptEvent.prompt();
});
