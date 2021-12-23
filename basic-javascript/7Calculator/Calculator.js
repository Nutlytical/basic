// operand(0-9)-operator(+ - * /)
const calculatorDisplay = document.querySelector('h1');
const inputBtn = document.querySelectorAll('button'); // array
const clearBtn = document.getElementById('clear-btn');

const calculate = {
	'/': (firstNumber, secondNumber) =>
		secondNumber != 0 ? firstNumber / secondNumber : 'error',
	'*': (firstNumber, secondNumber) => firstNumber * secondNumber,
	'+': (firstNumber, secondNumber) => firstNumber + secondNumber,
	'-': (firstNumber, secondNumber) => firstNumber - secondNumber,
	'=': (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0; //ค่าเริ่มต้น
let operatorValue = ''; //เก็บตัวดำเนินการ
let waitForNext = false; //เก็บสถานะของตัวเลขและตัวดำเนินการ

function setNumberValue(number) {
	if (waitForNext) {
		calculatorDisplay.textContent = number;
		waitForNext = false;
	} else {
		const displayValue = calculatorDisplay.textContent;
		calculatorDisplay.textContent =
			displayValue === '0' ? number : displayValue + number;
	}
}

function callOperator(operator) {
	// console.log(typeof operator);
	const currentValue = Number(calculatorDisplay.textContent);
	if (operatorValue && waitForNext) {
		operatorValue = operator;
		return;
	}
	if (!firstValue) {
		firstValue = currentValue;
	} else {
		const result = calculate[operatorValue](firstValue, currentValue);

		console.log(calculate[operatorValue]);
		calculatorDisplay.textContent = result;
		firstValue = result;
		if (firstValue === 'error') {
			resetAll();
		}
	}
	operatorValue = operator;
	waitForNext = true;
}

function addDecimal() {
	if (waitForNext) return;
	if (!calculatorDisplay.textContent.includes('.')) {
		calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
	}
}

inputBtn.forEach((input) => {
	if (input.classList.length === 0) {
		input.addEventListener('click', () => setNumberValue(input.value));
	} else if (input.classList.contains('operator')) {
		input.addEventListener('click', () => callOperator(input.value));
	} else if (input.classList.contains('decimal')) {
		input.addEventListener('click', () => addDecimal());
	}
});

function resetAll() {
	firstValue = 0;
	operatorValue = '';
	waitForNext = false;
	calculatorDisplay.textContent = '0';
}
clearBtn.addEventListener('click', () => resetAll());
