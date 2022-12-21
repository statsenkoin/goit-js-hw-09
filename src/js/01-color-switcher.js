const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
// const body = document.querySelector('body');
let timerID = null;
btnStop.setAttribute('disabled', 'true');

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
  document.body.style.backgroundColor = getRandomHexColor();
  btnStart.setAttribute('disabled', 'true');
  btnStop.removeAttribute('disabled');

  timerID = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onBtnStopClick() {
  clearInterval(timerID);
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', 'true');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
