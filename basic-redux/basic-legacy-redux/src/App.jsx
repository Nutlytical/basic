import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Nav from './components/Nav';
import Products from './pages/Products';
import SignIn from './pages/SignIn';
import Cart from './pages/Cart';

import './App.css';

function UnAuthApp() {
	return (
		<div className="App">
			<Nav />
			<Switch>
				<Route path="/signin">
					<SignIn />
				</Route>
				<Route path="/">
					<Products />
				</Route>
			</Switch>
		</div>
	);
}

function AuthApp() {
	return (
		<div className="App">
			<Nav />
			<Switch>
				<Route path="/cart">
					<Cart />
				</Route>
				<Route path="/">
					<Products />
				</Route>
			</Switch>
		</div>
	);
}

function App() {
	const { user } = useSelector((state) => state.auth);
	return <div className="App">{!user ? <UnAuthApp /> : <AuthApp />}</div>;
}

export default App;
