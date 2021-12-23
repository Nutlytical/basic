const container = document.querySelector('.slider-container');
const leftContent = document.querySelector('.left-content');
const rightContent = document.querySelector('.right-content');

const up = document.querySelector('.up-button');
const down = document.querySelector('.down-button');

const sliderLength = rightContent.querySelectorAll('div').length;

let activeIndex = 0;

up.addEventListener('click', () => {
	changeImage('up');
});
down.addEventListener('click', () => {
	changeImage('down');
});

function changeImage(btn) {
	const sliderHeight = container.clientHeight;
	if (btn === 'up') {
		activeIndex--;
		if (activeIndex < 0) {
			activeIndex = sliderLength - 1;
		}
	} else if (btn === 'down') {
		activeIndex++;
		if (activeIndex > sliderLength - 1) {
			activeIndex = 0;
		}
	}
	leftContent.style.transform = `translateY(-${activeIndex * sliderHeight}px)`;
	rightContent.style.transform = `translateY(-${activeIndex * sliderHeight}px)`;

	console.log(`translateY(-${activeIndex * sliderHeight}px)`);
}
