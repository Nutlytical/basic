const express = require('express');
const router = express.Router();

// เรียกใช้งาน Model
const Product = require('../models/products');

// แสดงผลข้อมูล
router.get('/', (req, res) => {
	Product.find().exec((err, document) => {
		res.render('index', { products: document });
	});
});

// ลบข้อมูล
router.get('/delete/:id', (req, res) => {
	Product.findByIdAndDelete(req.params.id, { useFindAndModify: false }).exec(
		(err) => {
			if (err) console.log(err);
			res.redirect('/manage');
		}
	);
});

router.get('/manage', (req, res) => {
	if (req.session.login) {
		Product.find().exec((err, document) => {
			res.render('manage', { products: document });
		});
	} else {
		res.render('admin'); // เข้าสู่ระบบ
	}
});

router.get('/addForm', (req, res) => {
	if (req.session.login) {
		res.render('form'); // บันทึกสินค้า
	} else {
		res.render('admin'); // เข้าสู่ระบบ
	}
});

router.post('/login', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const timeExpire = 20000; // 20 second

	if (username === 'admin' && password === '123') {
		// สร้าง Session
		req.session.username = username;
		req.session.password = password;
		req.session.login = true;
		req.session.cookie.maxAge = timeExpire;
		res.redirect('/manage');
	} else {
		res.redirect('/');
	}
});

router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		res.redirect('/manage');
	});
});

// อัพโหลด File
const multer = require('multer');
const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './public/images/products'); // ตำแหน่งจัดเก็บ File
	},
	filename: function (req, file, callback) {
		callback(null, Date.now() + '.jpg'); //เปลี่ยนชื่อ File ป้องกันชื่อซ้ำ
	},
});

const upload = multer({ storage: storage });

router.post('/insert', upload.single('image'), (req, res) => {
	let data = new Product({
		name: req.body.name,
		price: req.body.price,
		image: req.file.filename,
		description: req.body.description,
	});
	Product.saveProduct(data, (err) => {
		if (err) console.log(err);
		res.redirect('/');
	});
});

// สอบถามข้อมูล
router.get('/:id', (req, res) => {
	const product_id = req.params.id;
	Product.findOne({ _id: product_id }).exec((err, document) => {
		res.render('product', { product: document });
	});
});

// แก้ไขข้อมูล
router.post('/edit', (req, res) => {
	const edit_id = req.body.edit_id;
	Product.findOne({ _id: edit_id }).exec((err, document) => {
		// นำข้อมูลเดิมที่ต้องการแก้ไข ไปแสดงในแบบฟอร์ม
		res.render('edit', { product: document });
	});
});

router.post('/update', (req, res) => {
	const update_id = req.body.update_id;
	let data = {
		name: req.body.name,
		price: req.body.price,
		description: req.body.description,
	};
	Product.findByIdAndUpdate(update_id, data, { useFindAndModify: false }).exec(
		(err) => {
			if (err) console.log(err);
			res.redirect('/manage');
		}
	);
});

module.exports = router;
