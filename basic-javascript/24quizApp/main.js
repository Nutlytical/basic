const questionData = [
	{
		question: '1.ข้อใดไม่ใช่ระบบปฏิบัติการ',
		a: 'dos',
		b: 'microsoft',
		c: 'window',
		d: 'android',
		correct: 'b',
	},
	{
		question: '1.ข้อใดคือ web browser',
		a: 'chrome',
		b: 'keyboard',
		c: 'mouse',
		d: 'moniter',
		correct: 'a',
	},
	{
		question: '1.ข้อใดคือฮาร์ดแวร์',
		a: 'keyboard',
		b: 'mouse',
		c: 'moniter',
		d: 'ถุกทุกข้อ',
		correct: 'd',
	},
];

const questionEl = document.querySelector('.question');
const answerEl = document.querySelectorAll('.answer');
const choiceA = document.getElementById('a-text');
const choiceB = document.getElementById('b-text');
const choiceC = document.getElementById('c-text');
const choiceD = document.getElementById('d-text');
const submit = document.querySelector('.submit');
const container = document.querySelector('.question-container');

let currentQuestion = 0;
let score = 0;

function checkChoice() {
	answerEl.forEach((element) => (element.checked = false));
}

function getChoiceAnswer() {
	let answer;
	answerEl.forEach((element) => {
		if (element.checked) {
			answer = element.id;
		}
	});
	return answer;
}

submit.addEventListener('click', () => {
	let answer = getChoiceAnswer();
	if (answer === questionData[currentQuestion].correct) {
		score++;
	}
	currentQuestion++;
	if (currentQuestion < questionData.length) {
		loadQuestion();
	} else {
		container.innerHTML = `<h2>คุณได้คะแนน ${score}/${questionData.length}</h2>`;
	}
});

function loadQuestion() {
	checkChoice();
	const currentQuizData = questionData[currentQuestion];
	questionEl.innerText = currentQuizData.question;
	choiceA.innerText = currentQuizData.a;
	choiceB.innerText = currentQuizData.b;
	choiceC.innerText = currentQuizData.c;
	choiceD.innerText = currentQuizData.d;
}

loadQuestion();
