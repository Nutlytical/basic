const slugify = require('slugify');
const Blogs = require('../models/blogs');
const { v4: uuidv4 } = require('uuid');

exports.create = (req, res) => {
	const { title, content } = req.body;
	const author = req.body.author || 'Admin';

	let slug = slugify(title);

	if (!slug) slug = uuidv4();

	switch (true) {
		case !title:
			return res.status(400).json({ error: 'Title is required.' });
			break;

		case !content:
			return res.status(400).json({ error: 'Content is required.' });
			break;
	}

	Blogs.create({ title, content, author, slug }, (err, blog) => {
		if (err) {
			res.status(400).json({ error: 'Title name is unique' });
		}
		res.json(blog);
	});
};

exports.getAllBlogs = (req, res) => {
	Blogs.find({}).exec((err, blogs) => {
		res.json(blogs);
	});
};

exports.singleBlog = (req, res) => {
	const { slug } = req.params;

	Blogs.findOne({ slug }).exec((err, blog) => {
		res.json(blog);
	});
};

exports.remove = (req, res) => {
	const { slug } = req.params;

	Blogs.findOneAndDelete({ slug }).exec((err, blog) => {
		if (err) console.log(err);
		res.json({
			message: 'ลบบทความเรียบร้อย',
		});
	});
};

exports.update = (req, res) => {
	const { slug } = req.params;
	const { title, content } = req.body;
	const author = req.body.author || 'Admin';

	let slugUpdate = slugify(title);

	if (!slugUpdate) slugUpdate = uuidv4();

	Blogs.findOneAndUpdate(
		{ slug },
		{ title, content, author, slug: slugUpdate },
		{ new: true }
	).exec((err, blog) => {
		if (err) console.log(err);
		res.json(blog);
	});
};
