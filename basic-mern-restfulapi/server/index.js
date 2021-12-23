const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const blogRoute = require('./routes/blog');
const authRoute = require('./routes/auth');

const app = express();

// connect cloud database
mongoose
	.connect(process.env.DATABASE, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => console.log('allow access'))
	.catch((err) => console.log(err));

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// router
app.use('/api', blogRoute);
app.use('/api', authRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`server is ready on http://localhost:${port}`);
});
