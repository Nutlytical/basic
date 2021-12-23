import { useEffect, useState } from 'react';
import './App.css';
import PhotoComponent from './components/PhotoComponent';

function App() {
	const [photos, setPhotos] = useState([]);
	const [page, setPage] = useState(1);
	const [isLoading, setISLoading] = useState(false);

	const apiKey = `BksBgQbZNCpzZ3-JHzhmSyLj8cckydX2x56XV7VM7_0`;

	const fetchImage = async () => {
		setISLoading(true);
		try {
			const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}`;
			const response = await fetch(apiUrl);
			const data = await response.json();
			setPhotos((oldData) => {
				return [...oldData, ...data];
			});
		} catch (error) {
			console.log(error);
		}
		setISLoading(false);
	};

	useEffect(() => {
		fetchImage();
		// eslint-disable-next-line
	}, [page]);

	useEffect(() => {
		const event = window.addEventListener('scroll', () => {
			if (
				window.innerHeight + window.scrollY >
					document.body.offsetHeight - 500 &&
				!isLoading
			) {
				setPage((oldPage) => {
					return oldPage + 1;
				});
			}
		});
		return () => window.removeEventListener('scroll', event);
		// eslint-disable-next-line
	}, []);

	return (
		<main>
			<h1>Infinit Scroll Photo | Unsplash API</h1>
			<section className="photos">
				<div className="display-photo">
					{photos.map((data) => {
						return <PhotoComponent key={data.id} {...data} />;
					})}
				</div>
			</section>
		</main>
	);
}

export default App;
