import './App.css';
import Navigation from './components/Navigation';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/page/Home';
import Member from './components/page/Member';
import Product from './components/page/Product';

function App() {
	return (
		<div>
			<BrowserRouter>
				<Navigation />
				<Switch>
					<Route path="/" component={Home} exact />
					<Route path="/member" component={Member} />
					<Route path="/product" component={Product} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
