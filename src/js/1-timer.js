import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const DateTimePicker = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const daysvalue = document.querySelector('[data-days]');
const hoursvalue = document.querySelector('[data-hours]');
const minutesvalue = document.querySelector('[data-minutes]');
const secondsvalue = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'bottomLeft',
      });
      button.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      button.disabled = false;
    }
  },
};

flatpickr(DateTimePicker, options);

let userSelectedDate = null;

button.addEventListener('click', () => {
  button.disabled = true;
  DateTimePicker.disabled = true;
  let lefttimecheck = setInterval(() => {
    const currentTime = new Date();
    const timeleft = userSelectedDate - currentTime;

    if (timeleft <= 0) {
      clearInterval(lefttimecheck);
      iziToast.success({
        title: 'Timer',
        message: 'Countdown completed!',
        position: 'bottomLeft',
      });
      DateTimePicker.disabled = false;
      return;
    }
    const timeComponents = convertMs(timeleft);
    updateTimer(timeComponents);
  }, 1000);
});

function addZero(value) {
  return String(value).padStart(2, '0');
}
function updateTimer({ days, hours, minutes, seconds }) {
  daysvalue.textContent = addZero(days);
  hoursvalue.textContent = addZero(hours);
  minutesvalue.textContent = addZero(minutes);
  secondsvalue.textContent = addZero(seconds);
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
///
