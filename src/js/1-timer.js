
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.css';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const dateArea = document.querySelector('.input-button input');
const startButton = document.querySelector('.input-button button');
const counterDays = document.querySelector('[data-days]');
const counterHours = document.querySelector('[data-hours]');
const counterMinutes = document.querySelector('[data-minutes]');
const counterSeconds = document.querySelector('[data-seconds]');
let userSelectedDate;

const errorOptions = {
	title: 'Error',
	titleColor: '#fff',
	iconUrl: 'https://icons.iconarchive.com/icons/gakuseisean/ivista/48/Error-icon.png',
	message: 'Illegal operation',
	messageColor: '#fff',
	position: 'topRight',
	backgroundColor: '#ef4040',
	class: 'my-toast-colors'
};
const options = {
	dateFormat: "Y-m-d H:i",
   enableTime: true,
   time_24hr: true,
   defaultDate: new Date(),
	minuteIncrement: 1,
  
  onClose(selectedDates) {
	  userSelectedDate = selectedDates[0];

	  if (userSelectedDate < options.defaultDate) {
		  iziToast.show(errorOptions);
		  startButton.disabled = true;
		  startButton.classList.remove('isActive');
		  return;
	  }
	  else {
		  startButton.disabled = false;
		  dateArea.disabled = false;
		  startButton.classList.add('isActive');
	  };
	},
};

flatpickr("#datetime-picker", options);
	
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

let intervalId;
startButton.disabled = true;
startButton.addEventListener('click', () => {
	if (intervalId) return;

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const different = userSelectedDate - currentTime;
	 const str = convertMs(different);
    counterDays.textContent = str.days;
	 counterHours.textContent = str.hours;
	 counterMinutes.textContent = str.minutes;
	 counterSeconds.textContent = str.seconds;
	  
	dateArea.classList.add('isDisable');
	startButton.disabled = true;
	dateArea.disabled = true;
	startButton.classList.remove('isActive');
	 
    if (different < 1000) {
		 clearInterval(intervalId);
		 intervalId = null;
   	 dateArea.disabled = false;
		 dateArea.classList.remove('isDisable');
    }
  }, 1000);
});

