const inputContainer = document.getElementById('input-container');
const countDownForm = document.getElementById('countDownForm');
const dateEl = document.getElementById('date-picker');

const countDownEl = document.getElementById('countdown');
const countDownTitleEl = document.getElementById('countdown-title');
const timeEl = document.querySelectorAll('span');
const countdownButtonEl = document.getElementById('countdown-button');

const completeEl = document.getElementById('complete');
const completeInfoEl = document.getElementById('complete-info');
const completeButtonEl = document.getElementById('complete-button');

// ตัวแปรควบคุมการทำงาน
let countDownTitle = '';
let countDownDate = '';
let countDownValue = Date; // เก็บวันที่เลือกจากฟอร์ม
let countdownActive; // ตัวนับเวลา
let saveCountDown; // เก็บข้อมูลหัวข้อและวันแจ้งเตือน

// ตัวแปรแปลงหน่วยเวลา
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

countDownForm.addEventListener('submit', updateCountdown);

function updateCountdown(e) {
	e.preventDefault();
	countDownTitle = e.srcElement[0].value;
	countDownDate = e.srcElement[1].value;

	if (countDownTitle === '') {
		alert('กรุณาป้อนข้อมูลให้ครบ');
	} else {
		saveCountDown = { title: countDownTitle, date: countDownDate };
		localStorage.setItem('countDown', JSON.stringify(saveCountDown));
		countDownValue = new Date(countDownDate).getTime(); // เวลาทีตั้งไว้
		setUpTime();
	}
}

function setUpTime() {
	countdownActive = setInterval(() => {
		// ทั้ตั้งไว้ - ปัจจุบัน
		const now = new Date().getTime();
		const distance = countDownValue - now;
		const days = Math.floor(distance / day);
		const hours = Math.floor((distance % day) / hour);
		const minutes = Math.floor((distance % hour) / minute);
		const seconds = Math.floor((distance % minute) / second);
		inputContainer.hidden = true;

		if (distance < 0) {
			// หมดเวลา
			countDownEl.hidden = true;
			completeEl.hidden = false;
			// เที่ยวทะเลวันที่ 02/11/2020
			completeInfoEl.textContent = `${countDownTitle} วันที่ ${countDownDate}`;
			clearInterval(countdownActive);
		} else {
			countDownTitleEl.textContent = `${countDownTitle}`;
			// นับถอยหลัง
			timeEl[0].textContent = `${days}`;
			timeEl[1].textContent = `${hours}`;
			timeEl[2].textContent = `${minutes}`;
			timeEl[3].textContent = `${seconds}`;
			countDownEl.hidden = false;
		}
	}, second);
}

function callDatainStore() {
	if (localStorage.getItem('countDown')) {
		inputContainer.hidden = true;
		saveCountDown = JSON.parse(localStorage.getItem('countDown'));
		countDownTitle = saveCountDown.title;
		countDownDate = saveCountDown.date;
		countDownValue = new Date(countDownDate).getTime();
		setUpTime();
	}
}

function reset() {
	localStorage.removeItem('countDown');
	countDownEl.hidden = true;
	completeEl.hidden = true;
	inputContainer.hidden = false;
	clearInterval(countdownActive);
	countDownTitle = '';
	countDownDate = '';
}

callDatainStore();

countdownButtonEl.addEventListener('click', reset);
completeButtonEl.addEventListener('click', reset);
