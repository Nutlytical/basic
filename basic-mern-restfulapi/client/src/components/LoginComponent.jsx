import React, { useState, useEffect } from 'react';
import axios from 'axios';

import NavbarComponent from './NavbarComponent';
import { authenticate, getUser } from '../../services/authorize';

const LoginComponent = () => {
	const [state, setState] = useState({
		username: '',
		password: '',
	});

	const { username, password } = state;

	// กำหนดค่าให้กับ state
	const inputValue = (name) => (event) => {
		setState({ ...state, [name]: event.target.value });
	};

	const submitForm = (e) => {
		e.preventDefault();
		axios
			.post(`${import.meta.env.VITE_APP_API}/login`, { username, password })
			.then((res) => {
				// login success
				authenticate(res);
			})
			.catch((err) => {
				Swal.fire('Oops...', err.response.data.error, 'error');
			});
	};

	useEffect(() => {
		getUser() && history.back();
	}, []);

	return (
		<div className="container p-5">
			<NavbarComponent />
			<h1 className="mb-3">เข้าสู่ระบบ | Admin</h1>
			{/* {JSON.stringify(state)} */}
			<form onSubmit={submitForm}>
				<div className="form-group">
					<label>Username</label>
					<input
						type="text"
						value={username}
						onChange={inputValue('username')}
						className="mb-3 form-control"
					/>
				</div>
				<div className="form-group">
					<label>Password</label>
					<input
						type="password"
						className="form-control"
						value={password}
						onChange={inputValue('password')}
					/>
				</div>
				<br />
				<input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary" />
			</form>
		</div>
	);
};

export default LoginComponent;
