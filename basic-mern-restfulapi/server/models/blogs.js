// title, content, author, slug(url)

const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
	{
		title: {
			type: String,
			require: true,
		},
		content: {
			type: {},
			require: true,
		},
		author: {
			type: String,
		},
		slug: {
			type: String,
			lowercase: true,
			unique: true,
		},
	},
	{ timestamps: true, setDefaultsOnInsert: true }
);

module.exports = mongoose.model('Blogs', blogSchema);
