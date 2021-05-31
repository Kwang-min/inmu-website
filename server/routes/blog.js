const express = require('express');
const router = express.Router();
const { Blog } = require("../models/blog");
const fs = require('fs');
const async = require("async");
const path = require('path')

const { auth } = require("../middleware/auth");
const multer = require('multer')

//=================================
//             Blog
//=================================


let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/images");
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}_${file.originalname}`);
	},
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname)
		if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.mp4') {
			return cb(res.status(400).end('only jpg, png, jpeg, mp4 is allowed'), false);
		}
		cb(null, true)
	}
});

const upload = multer({ storage: storage }).single("file");

router.post("/uploadfiles", (req, res) => {
	upload(req, res, err => {
		if (err) {
			return res.json({ success: false, err });
		}
		return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
	});
});

router.post("/createPost", (req, res) => {

	const blog = new Blog(req.body);

	blog.save((err, postInfo) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).json({
			success: true, postInfo
		});
	});
});

router.post("/deletePost", (req, res) => {
	Blog.findOneAndDelete({ "_id": req.body.postId }, function (err, docs) {

		if (err) return res.json({ success: false, err })

		async.each(docs.files, function (file, callback) {
			const target = path.basename(file)
			fs.unlink(`uploads/images/${target}`, (err) => {
				if (err) callback(err)
				callback();
			})
		}, function (err) {
			if (err) {
				return res.json({ success: false, err })
			} else {
				res.status(200).json({ success: true, docs })
			}
		});
	});

});


router.post("/updatePost", (req, res) => {
	Blog.findOneAndUpdate({ "_id": req.body.postId },
		{
			title: req.body.title,
			content: req.body.content,
			files: req.body.files
		}
		, (err, doc) => {
			if (err) return res.json({ success: false, err })
			return res.status(200).send({
				success: true
			})
		})

});

router.get("/getBlogs", (req, res) => {
	Blog.find()
		.populate('writer')
		.exec((err, blogs) => {
			if (err) return res.status(400).send(err);

			res.status(200).json({ success: true, blogs })
		})
});

router.post("/getPost", (req, res) => {

	Blog.findOne({ "_id": req.body.postId })
		.populate('writer')
		.exec((err, post) => {
			if (err) return res.status(400).send(err);
			res.status(200).json({ success: true, post })
		})


});


module.exports = router;
