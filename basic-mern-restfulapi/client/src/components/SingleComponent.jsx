import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Parser } from 'html-to-react';

import NavbarComponent from './NavbarComponent';

const SingleComponent = () => {
	const [blog, setBlog] = useState('');

	let params = useParams();

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_APP_API}/blog/${params.slug}`)
			.then((res) => setBlog(res.data))
			.catch((err) => alert(err));
	}, []);

	return (
		<div className="container">
			<NavbarComponent />
			{blog && (
				<>
					<h1>{blog.title}</h1>
					<div className="pt-3">{Parser().parse(blog.content)}</div>
					<p className="text-muted">
						ผู้เขียน: {blog.author}, เผยแพร่:{' '}
						{new Date(blog.createdAt).toLocaleString()}
					</p>
				</>
			)}
		</div>
	);
};

export default SingleComponent;
