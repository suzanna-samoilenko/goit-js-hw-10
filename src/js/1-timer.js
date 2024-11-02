import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const timerElm = {
  dateTime: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let userSelectedDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < Date.now()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future!',
        position: 'topRight',
        timeout: 4000,
      });
      timerElm.startBtn.disabled = true;
    } else {
      timerElm.startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

timerElm.startBtn.addEventListener('click', event => {
  timerElm.startBtn.disabled = true;
  timerElm.dateTime.disabled = true;

  intervalId = setInterval(() => {
    const intervalTime = userSelectedDate - Date.now();

    if (intervalTime <= 0) {
      clearInterval(intervalId);
      updateClock(convertMs(0));
      timerElm.dateTime.disabled = false;
      return;
    }

    const time = convertMs(intervalTime);
    updateClock(time);
  }, 1000);
});

function updateClock(time) {
  timerElm.days.textContent = addLeadingZero(time.days);
  timerElm.hours.textContent = addLeadingZero(time.hours);
  timerElm.minutes.textContent = addLeadingZero(time.minutes);
  timerElm.seconds.textContent = addLeadingZero(time.seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
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
