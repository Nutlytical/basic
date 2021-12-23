import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import NavbarComponent from './NavbarComponent';
import { getUser, getToken } from '../../services/authorize';

export default function EditComponent() {
	const [state, setState] = useState({
		title: '',
		author: '',
		slug: '',
	});

	const [content, setContent] = useState('');

	let params = useParams();

	const submitContent = (event) => {
		setContent(event);
	};

	const { title, author, slug } = state;

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_APP_API}/blog/${params.slug}`)
			.then((res) => {
				const { title, content, author, slug } = res.data;
				setState({ ...state, title, author, slug });
				setContent(content);
			})
			.catch((err) => alert(err));
	}, []);

	useEffect(() => {
		!getUser() && history.back();
	}, []);

	const inputValue = (name) => (event) => {
		setState({ ...state, [name]: event.target.value });
	};

	const showUpdateFrom = () => (
		<form onSubmit={submitForm}>
			<div className="form-group">
				<label>ชื่อบทความ</label>
				<input
					type="text"
					className="form-control"
					defaultValue={title}
					onChange={inputValue('title')}
				/>
			</div>
			<div className="form-group">
				<label>รายละเอียด</label>
				<ReactQuill
					value={content}
					theme="snow"
					className="mb-3"
					onChange={submitContent}
				/>
			</div>
			<div className="form-group">
				<label>ผู้แต่ง</label>
				<input
					type="text"
					className="form-control"
					value={author}
					onChange={inputValue('author')}
				/>
			</div>
			<br />
			<input type="submit" value="อัพเดท" className="btn btn-primary" />
		</form>
	);

	const submitForm = (e) => {
		e.preventDefault();
		axios
			.put(
				`${import.meta.env.VITE_APP_API}/blog/${slug}`,
				{
					title,
					content,
					author,
				},
				{
					headers: {
						authorization: `Bearer ${getToken()}`,
					},
				}
			)
			.then((res) => {
				Swal.fire('Good job!', 'success', 'success');
				history.back();
			})
			.catch((err) => {
				alert(err);
			});
	};

	return (
		<div className="container p-5">
			<NavbarComponent />
			<h1>แก้ไขบทความ</h1>
			{showUpdateFrom()}
		</div>
	);
}
