// token / username => session storage

export const authenticate = (res) => {
	// if (window !== 'undefined') {
	// เก็บข้อมูลลง session storage
	sessionStorage.setItem('token', JSON.stringify(res.data.token));
	sessionStorage.setItem('user', JSON.stringify(res.data.username));
	// }
	history.back();
};

// get token from session storage
export const getToken = () => {
	// if (window !== 'undefine') {
	if (sessionStorage.getItem('token')) {
		return JSON.parse(sessionStorage.getItem('token'));
	} else {
		return false;
	}
	// }
};

// get user from session storage
export const getUser = () => {
	// if (window !== 'undefine') {
	if (sessionStorage.getItem('user')) {
		return JSON.parse(sessionStorage.getItem('user'));
	} else {
		return false;
	}
	// }
};

// logout
export const logout = () => {
	// if (window !== 'undefined') {
	sessionStorage.removeItem('user');
	sessionStorage.removeItem('token');
	// }
	history.go(-1);
};
