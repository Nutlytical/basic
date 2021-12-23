const container = document.getElementById('container');
const imgs = document.querySelectorAll('#container img');

const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

let index = 0;

let interval = setInterval(slide, 2000);

function slide() {
	index++;
	changeImage();
}

function changeImage() {
	container.style.transform = `translateX(${-index * 500}px)`;

	if (index > imgs.length - 1) {
		index = 0;
	} else if (index < 0) {
		index = imgs.length - 1;
	}
	console.log(`translateX(${-index * 500}px)`);
}

leftBtn.addEventListener('click', () => {
	index--;
	changeImage();
	resetInterval();
});

rightBtn.addEventListener('click', () => {
	index++;
	changeImage();
	resetInterval();
});

function resetInterval() {
	clearInterval(interval);
	interval = setInterval(() => {
		slide;
	}, 2000);
}
