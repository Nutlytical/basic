const category = document.querySelectorAll('.category');

window.addEventListener('scroll', showCategory);

function showCategory() {
	const height = window.innerHeight - 200; // -200 ค่อยๆ เลื่อนทีละตัว

	category.forEach((category) => {
		const topPosition = category.getBoundingClientRect().top;
		if (topPosition < height) {
			category.classList.add('active');
		} else {
			category.classList.remove('active');
		}
	});
}
