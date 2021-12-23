import React from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

import './App.css';

function App() {
	const signInWithFacebook = async (response) => {
		console.log('Res -->', response);
		const { name, email, accessToken, userID } = response;
		const user = { name, email, accessToken, userId: userID };

		await axios({
			method: 'post',
			url: 'http://localhost:4000/signin/facebook',
			data: {
				user,
			},
		});
	};

	const signInWithGoogle = async (response) => {
		console.log('Res -->', response);
		const {
			tokenObj: { access_token },
			profileObj: { googleId, email, name },
		} = response;
		const user = { name, email, accessToken: access_token, userId: googleId };

		await axios({
			method: 'post',
			url: 'http://localhost:4000/signin/google',
			data: {
				user,
			},
		});
	};

	return (
		<div className="App">
			<div>
				<FacebookLogin
					appId="API_KEY" // from facebook developer
					fields="name, email"
					scope="public_profile, email"
					callback={signInWithFacebook}
				/>
			</div>
			<hr />
			<div>
				<GoogleLogin
					clientId="API_KEY" // from console google developer
					buttonText="LOGIN WITH GOOGLE"
					onSuccess={signInWithGoogle}
					onFailure={signInWithGoogle}
					cookiePolicy={'single_host_origin'}
				/>
			</div>
			<a href="http://localhost:4000/auth/facebook">Login with Facebook</a>
			<hr />
			<a href="http://localhost:4000/auth/google">Login with Google</a>
		</div>
	);
}

export default App;
