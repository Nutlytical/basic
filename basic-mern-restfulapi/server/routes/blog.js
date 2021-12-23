const express = require('express');
const router = express.Router();

const { requireLogin } = require('../controllers/authController');

const {
	create,
	getAllBlogs,
	singleBlog,
	remove,
	update,
} = require('../controllers/blogController');

router.get('/blogs', getAllBlogs);
router.get('/blog/:slug', singleBlog);

router.post('/create', requireLogin, create);
router.delete('/blog/:slug', requireLogin, remove);
router.put('/blog/:slug', requireLogin, update);

module.exports = router;
