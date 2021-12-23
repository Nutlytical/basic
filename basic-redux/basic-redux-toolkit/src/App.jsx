import { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Nav from './components/Nav';
import Products from './pages/Products';
import SignIn from './pages/SignIn';
import Cart from './pages/Cart';

import './App.css';

function UnAuthApp() {
	return (
		<div className="App">
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

	const history = useHistory();

	useEffect(() => {
		if (!user) history.push('/singin');
		else history.push('/');
	}, [user]);
	return (
		<div className="App">
			<Nav />

			{!user ? <UnAuthApp /> : <AuthApp />}
		</div>
	);
}

export default App;
