import { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [countries, setCountries] = useState([]);
	const [word, setWord] = useState('');
	const [dataFilter] = useState(['name', 'region']);

	useEffect(() => {
		fetch('https://restcountries.com/v3.1/all')
			.then((res) => res.json())
			.then((data) => setCountries(data));
	}, []);

	const formatNumber = (num) => {
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	};

	const searchCountries = (countries) => {
		return countries.filter((item) => {
			return dataFilter.some((filter) => {
				if (filter === 'region') {
					return item[filter].toLowerCase().indexOf(word.toLowerCase()) > -1;
				} else if (filter === 'name') {
					return (
						item[filter].common
							.toString()
							.toLowerCase()
							.indexOf(word.toLowerCase()) > -1
					);
				}
				return console.log(item.capital); // ยังทำ บ่ ได้
			});
		});
	};

	return (
		<div className="container">
			<div className="search-container">
				<div className="search-form">
					<label htmlFor="search-form">
						<input
							type="text"
							className="search-input"
							placeholder="ค้นหาข้อมูล (ภูมิภาค, ประเทศ)"
							value={word}
							onChange={(e) => setWord(e.target.value)}
						/>
					</label>
				</div>
			</div>
			<ul className="row">
				{searchCountries(countries).map((item, index) => {
					return (
						<li key={index}>
							<div className="card">
								<div className="card-title">
									<img src={item.flags.svg} alt={item.name} />
								</div>
								<div className="card-body">
									<div className="card-description">
										<h2>{item.name.common}</h2>
										<ol className="card-list">
											<li>
												ประชากร : <span>{formatNumber(item.population)}</span>
											</li>
											<li>
												ภูมิภาค : <span>{item.region}</span>
											</li>
											<li>
												เมืองหลวง : <span>{item.capital}</span>
											</li>
										</ol>
									</div>
								</div>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default App;
