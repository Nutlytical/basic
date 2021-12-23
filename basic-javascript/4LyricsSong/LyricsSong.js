const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh/';

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const songtxt = search.value.trim();

	if (!songtxt) {
		alert('ป้อนข้อมูลไม่ถูกต้อง');
	} else {
		searchLyrics(songtxt); //ส่งค่า
	}
});
async function searchLyrics(song) {
	//รับค่า
	const res = await fetch(`${apiURL}/suggest/${song}`);
	const allSongs = await res.json();
	console.log(allSongs);
	showData(allSongs);
}

function showData(songs) {
	result.innerHTML = `
	<ul class = "songs">
		${songs.data
			.map((song) => {
				return `<li>
							<span>
								<strong>${song.artist.name}</strong> - ${song.title}
							</span>
							<button class = "btn" 
							data-artist = "${song.artist.name}"
							data-song = "${song.title}"
							>เนื้อเพลง</button>
						</li>`;
			})
			.join('')}
	</ul>`;
	if (songs.next || songs.prev) {
		more.innerHTML = `${
			songs.prev
				? `<button class = "btn" onclick = "getMoreSongs('${songs.prev}')">ก่อนหน้า</button>`
				: ''
		}
		${
			songs.next
				? `<button class = "btn" onclick = "getMoreSongs('${songs.next}')">ถัดไป</button>`
				: ''
		}
		`;
	} else {
		more.innerHTML = '';
	}
}

async function getMoreSongs(songsUrl) {
	// https://cors-anywhere.herokuapp.com/ แก้ปัญหา CORS ERROR
	const res = await fetch(`https://cors-anywhere.herokuapp.com/${songsUrl}`);
	const allSongs = await res.json();
	showData(allSongs);
}

result.addEventListener('click', (e) => {
	const clickEl = e.target;

	if (clickEl.tagName === 'BUTTON') {
		const artist = clickEl.getAttribute('data-artist');
		const songName = clickEl.getAttribute('data-song');

		getLyrics(artist, songName);
	}
});

async function getLyrics(artist, songName) {
	const res = await fetch(`${apiURL}/v1/${artist}/${songName}`);
	const data = await res.json();
	const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

	console.log(data);
	if (data) {
		result.innerHTML = `<h2>
								<span>
									<strong>${artist}</strong> - ${songName}
								</span>
							</h2>
							<span>${lyrics}</span>
		`;
	} else {
		result.innerHTML = `<h2>
								<span>
									<strong>${artist}</strong> - ${songName}
								</span>
							</h2>
							<span>ไม่มีข้อมูลเนื้อเพลงนี้</span>
		`;
	}
	more.innerHTML = '';
}
