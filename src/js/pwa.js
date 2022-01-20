const installButtonEl = document.querySelector('.installSection');

let beforeInstallPromptEvent;

window.addEventListener('beforeinstallprompt', function (e) {
  e.preventDefault();
  beforeInstallPromptEvent = e;
  installButtonEl.style.display = 'flex';
  installButtonEl.addEventListener('click', function () {
    e.prompt();
  });
  installButtonEl.hidden = false;
});
installButtonEl.addEventListener('click', function () {
  beforeInstallPromptEvent.prompt();
});
