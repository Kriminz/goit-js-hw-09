// Описаний в документації
import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const timePicker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector('button[data-start]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const ft = flatpickr(timePicker, options);

console.log(ft.onClose);

//   const calcTime = convertMs();
//   console.log(calcTime);

class Countdown{
  start() {
    // function convertMs(ms) {
    //   // Number of milliseconds per unit of time
    //   const second = 1000;
    //   const minute = second * 60;
    //   const hour = minute * 60;
    //   const day = hour * 24;

    //   // Remaining days
    //   const days = Math.floor(ms / day);
    //   // Remaining hours
    //   const hours = Math.floor((ms % day) / hour);
    //   // Remaining minutes
    //   const minutes = Math.floor(((ms % day) % hour) / minute);
    //   // Remaining seconds
    //   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    //   return { days, hours, minutes, seconds };
    // }

    const date = new Date.now();

  } 
}



console.log(date);

const countdown = new Countdown();

timePicker.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(e.target);
});

startBtn.addEventListener('click', (e) => {
    countdown.start();
});

// startBtn.addEventListener('click', (e) => {
//   if(e.target.dataset.action === 'start') {
//     startBtn.textContent = 'Stop';
//     e.target.dataset.action = 'stop';
//     timePicker.disabled = true;

//     countdown.start();
//   }
//   else {
//     startBtn.textContent = 'Start';
//     e.target.dataset.action = 'start';
//     timePicker.disabled = false;

//     countdown.stop();
//   }
// });