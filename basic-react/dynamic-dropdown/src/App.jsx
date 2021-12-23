import { useState } from 'react';
import './App.css';
import MenuData from './data/MenuData';
import DropdownComponent from './components/DropdownComponent';
import FoodComponent from './components/FoodComponent';

function App() {
	const [foods, setFood] = useState(MenuData);

	const changeFoodData = (e) => {
		const category = e.target.value;
		const result = MenuData.filter((element) => {
			return element.menu === category;
		});
		if (category === 'เมนูทั้งหมด') {
			setFood(MenuData);
		} else {
			setFood(result);
		}
	};
	return (
		<div className="container">
			<DropdownComponent changeFoodData={changeFoodData} />
			<div className="content">
				{foods.map((data, index) => {
					return <FoodComponent key={index} {...data} />;
				})}
			</div>
		</div>
	);
}

export default App;
