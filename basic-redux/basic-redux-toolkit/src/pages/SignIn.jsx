import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signInAsync } from '../store/slices/authSlice';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const { loading, error } = useSelector((state) => state.auth);

	return (
		<div className="form">
			<input
				typEmail
				name="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				name="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={() => dispatch(signInAsync({ email, password }))}>
				{loading ? 'Loading ...' : 'Submit'}
			</button>
			{error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
		</div>
	);
}
