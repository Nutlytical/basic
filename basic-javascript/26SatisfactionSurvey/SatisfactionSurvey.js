const ratingContainer = document.querySelector('.rating-container');
const ratings = document.querySelectorAll('.rating');
const panel = document.getElementById('panel');
const send = document.getElementById('send');

let selected;
ratingContainer.addEventListener('click', (e) => {
	if (e.target.parentNode.classList.contains('rating')) {
		removeActive();
		e.target.parentNode.classList.add('active');
		selected = e.target.nextElementSibling.innerHTML;
	}
});

function removeActive() {
	for (let i = 0; i < ratings.length; i++) {
		ratings[i].classList.remove('active');
	}
}

send.addEventListener('click', () => {
	if (selected === undefined) {
		alert('กรุณาป้อนข้อมูล');
	} else {
		panel.innerHTML = `
    <img src="img/2764.png" class="img-complete">
    <strong>ขอบคุณที่ใช้บริการของเรา</strong>
    <br>
    <strong>ผลการประเมิน : ${selected}</strong>
    `;
	}
});
