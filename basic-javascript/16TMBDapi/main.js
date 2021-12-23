const apiKeys = '05550f795a0585eba7bfc88f922d23bf'; //Search movie Database
let years = 2021;
const url = `
https://api.themoviedb.org/3/discover/movie?api_key=${apiKeys}&language=en-US&sort_by=popularity.desc&page=1&year=${years}`;

const content = document.getElementById('content');
const urlPoster = `https://image.tmdb.org/t/p/w500/`;
const select = document.getElementById('years');

async function displayMovies(url) {
	const response = await fetch(url);
	const movies = await response.json();
	while (content.firstChild) {
		content.removeChild(content.firstChild);
	}
	movies.results.forEach((data) => {
		const movieEl = document.createElement('div');
		movieEl.classList.add('movie');
		const title = document.createElement('h2');
		const poster = document.createElement('img');
		title.innerHTML = `${data.title.substring(0, 24)}`;
		poster.src = `${urlPoster}${data.poster_path}`;
		movieEl.appendChild(title);
		movieEl.appendChild(poster);
		content.appendChild(movieEl);
	});
	console.log(movies);
}

select.addEventListener('change', () => {
	years = select.value;
	const updateUrl = `
https://api.themoviedb.org/3/discover/movie?api_key=${apiKeys}&language=en-US&sort_by=popularity.desc&page=1&year=${years}`;
	displayMovies(updateUrl);
});

displayMovies(url);
