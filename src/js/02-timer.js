// min style
// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const inputPicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const fieldDays = document.querySelector('[data-days]');
const fieldHours = document.querySelector('[data-hours]');
const fieldMinutes = document.querySelector('[data-minutes]');
const fieldSeconds = document.querySelector('[data-seconds]');
let timerID = null;

btnStart.setAttribute('disabled', 'true');
// btnStart.addEventListener('click', onBtnStartClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    clearInterval(timerID);

    if (selectedDates[0] - Date.now() > 1000) {
      btnStart.removeAttribute('disabled');
      btnStart.addEventListener(
        'click',
        () => {
          onBtnStartClick(selectedDates[0]);
        },
        { once: true }
      );
    } else {
      window.alert('Please choose a date in the future');
    }
  },
};

flatpickr(inputPicker, options);

function onBtnStartClick(selectedDates) {
  timerID = setInterval(() => {
    const timeLeftMs = selectedDates - Date.now();
    const timeLeft = convertMs(timeLeftMs);
    fieldDays.textContent = timeLeft.days;
    fieldHours.textContent = timeLeft.hours;
    fieldMinutes.textContent = timeLeft.minutes;
    fieldSeconds.textContent = timeLeft.seconds;

    if (timeLeftMs < 1000) {
      clearInterval(timerID);
    }
    console.log('timeLeft :>> ', timeLeft);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
