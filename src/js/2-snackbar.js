import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const myForm = document.querySelector('.form');
const radioButton = document.querySelectorAll('input[name="state"]');
const userMessage = document.querySelector('input[type="number"]');
let userNumber= null;
let myChoosen;

radioButton.forEach(radio => {
	radio.addEventListener('change', () => {
		myChoosen = document.querySelector('input[name="state"]:checked').value;
	});
});

userMessage.addEventListener('input', () => {
	userNumber = userMessage.valueAsNumber;
});

function createPromise(delay, value) {
	const myPromise = new Promise((resolt, reject) => {
		setTimeout(() => {
			if (value === 'fulfilled') {
				resolt(delay)
			} else (
				reject(delay)
			);
		}, delay);
	});
	return myPromise;
}

myForm.addEventListener('submit', e => {
	e.preventDefault();
	const myPromise = createPromise(userNumber, myChoosen);
	myPromise.then((delay) => {
		iziToast.show({
		iconUrl: 'https://icons.iconarchive.com/icons/gakuseisean/ivista/48/Good-or-Tick-icon.png',
	message: `Fulfilled promise in ${delay} ms`,
	messageColor: '#fff',
	position: 'topRight',
	backgroundColor: '#59a10d',
	class: 'my-toast-colors'
	});
	}).catch((delay) => {
		iziToast.show({
				iconUrl: 'https://icons.iconarchive.com/icons/gakuseisean/ivista/48/Error-icon.png',
	message: `Rejected promise in ${delay} ms`,
	messageColor: '#fff',
	position: 'topRight',
	backgroundColor: '#ef4040',
	class: 'my-toast-colors'
});
	});
});

