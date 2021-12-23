import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import NavbarComponent from './NavbarComponent';
import { getUser, getToken } from '../../services/authorize';

export default function FormComponent() {
	const [state, setState] = useState({
		title: '',
		author: getUser(),
	});

	const { title, author } = state;

	const [content, setContent] = useState('');

	// กำหนดค่าให้กับ state
	const inputValue = (name) => (event) => {
		setState({ ...state, [name]: event.target.value });
	};

	const submitContent = (event) => {
		setContent(event);
	};

	const submitForm = (e) => {
		e.preventDefault();
		// console.table({ title, content, author });
		axios
			.post(
				`${import.meta.env.VITE_APP_API}/create`,
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
				Swal.fire('Oops...', err.response.data.error, 'error');
			});
	};

	useEffect(() => {
		!getUser() && history.back();
	}, []);

	return (
		<div className="container p-5">
			<NavbarComponent />
			<h1 className="mb-3">เขียนบทความ</h1>
			{/* {JSON.stringify(state)} */}
			<form onSubmit={submitForm}>
				<div className="form-group">
					<label>ชื่อบทความ</label>
					<input
						type="text"
						value={title}
						onChange={inputValue('title')}
						className="mb-3 form-control"
					/>
				</div>
				<div className="form-group">
					<label>รายละเอียด</label>
					{/* <ReactQuill
						value={content}
						onChange={submitContent}
						theme="snow"
						placeholder="เขียนรายละเอียดบทความของคุณ"
						className="mb-3"
					/> */}
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
				<input type="submit" value="บันทึกบทความ" className="btn btn-primary" />
			</form>
		</div>
	);
}
