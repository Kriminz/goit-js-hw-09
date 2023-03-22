import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  timePicker: document.querySelector("#datetime-picker"),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
}
var ms = 0;

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if(selectedDates[0] < new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future");
    }
    else {
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.timePicker, options);

function pad(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad (Math.floor(ms / day));
  // Remaining hours
  const hours = pad (Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad (Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad (Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
  // console.log({ days, hours, minutes, seconds });
}

function onCountdownChange({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

class Countdown{

  #intervalId = null

  #onChangeCallback = () => {}

  constructor ({onChange} = {}) {
    if (onChange) {
      this.#onChangeCallback = onChange;
    }
  }

  start(chooseDate) {
    this.#intervalId = setInterval(() => {
      ms = chooseDate - new Date().getTime();
      // console.log(ms);
      // console.log(chooseDate);
      // console.log(new Date);
      convertMs(ms);
      // putDays(dayCount);
      this.#onChangeCallback(convertMs(ms));
    }, 1000);
  } 

  stop() {
    clearInterval(this.#intervalId);
  }

}

const countdown = new Countdown({onChange: onCountdownChange});

refs.startBtn.addEventListener('click', (e) => {
  const chooseDate = new Date(refs.timePicker.value).getTime();
  if(e.target.dataset.action === 'start') {
    refs.startBtn.textContent = 'Stop';
    e.target.dataset.action = 'stop';
    refs.timePicker.disabled = true;

    countdown.start(chooseDate);
  }
  else {
    refs.startBtn.textContent = 'Start';
    e.target.dataset.action = 'start';
    refs.timePicker.disabled = false;

    countdown.stop();
  }
});