const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');

exports.login = (req, res) => {
	const { username, password } = req.body;
	if (password === process.env.ADMIN_PASSWORD) {
		// login
		const token = jwt.sign({ username }, process.env.JWT_SECRET, {
			expiresIn: '1d',
		});

		return res.json({ token, username });
	} else {
		return res.status(400).json({ error: 'No Authorization!' });
	}
};

// check token
exports.requireLogin = expressJWT({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256'],
	userProperty: 'auth',
});
