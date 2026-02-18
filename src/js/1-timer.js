import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const onClose = selectedDates => {
  console.log(selectedDates[0]);
  const date = selectedDates[0];
  if (date <= new Date()) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    startBtn.disabled = true;
    return;
  } else {
    startBtn.disabled = false;
    selectedTime = date;
  }
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onClose,
};

const dateTimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

startBtn.disabled = true;

let selectedTime = null;
let timerId = null;

flatpickr(dateTimePicker, options);

startBtn.addEventListener('click', () => {
  dateTimePicker.disabled = true;
  startBtn.disabled = true;
  timerId = setInterval(() => {
    const now = new Date();
    const deltaTime = selectedTime - now;

    if (deltaTime <= 0) {
      clearInterval(timerId);
      updateTimer(0);
      dateTimePicker.disabled = false;
      return;
    }

    updateTimer(deltaTime);
  }, 1000);
});

function updateTimer(ms) {
  const time = convertMs(ms);
  days.textContent = addLeadingZero(time.days);
  hours.textContent = addLeadingZero(time.hours);
  minutes.textContent = addLeadingZero(time.minutes);
  seconds.textContent = addLeadingZero(time.seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
