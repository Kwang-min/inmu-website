const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const { Comment } = require("../models/Comment");
const fs = require('fs');
const async = require("async");

const multer = require("multer")
var ffmpeg = require('fluent-ffmpeg');

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/videos/");
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}_${file.originalname}`);
	},
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname)
		if (ext !== '.mp4') {
			return cb(res.status(400).end('Only mp4 is allowed'), false);
		}
		cb(null, true)
	}
})

const upload = multer({ storage: storage }).single("file");

router.post('/uploadfiles', (req, res) => {
	upload(req, res, err => {
		if (err) {
			console.log(err)
			return res.json({ success: false, err })
		}
		return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
	})
})

router.post('/uploadVideo', (req, res) => {

	const video = new Video(req.body)

	video.save((err, doc) => {
		if (err) return res.json({ success: false, err })
		res.status(200).json({ success: true })
	})


})

router.post('/updateVideo', (req, res) => {

	Video.findOneAndUpdate({ "_id": req.body.videoId },
					{
						title: req.body.title,
						description: req.body.description,
					}
					, (err, doc) => {
						if (err) return res.json({ success: false, err })
						res.status(200).json({ success: true })
					})
})

router.post('/deleteVideo', (req, res) => {
	// 게시글 db에서 삭제, 썸네일 삭제, 비디오 파일 삭제, 댓글 모조리 삭제 
	async.waterfall(
		[
			function (cb) {
				Video.findOneAndDelete({ "_id": req.body.postId }, function (err, deleted) {

					if (err) return res.json({ success: false, err })
					
					cb( null, deleted );
				});
			},
			function (deleted, cb) {
				fs.unlink(deleted.thumbnail,(err)=>{ 
					if (err) return res.json({ success: false, err })
					cb( null, deleted );
				})
			},
			function (deleted,cb) {
				fs.unlink(deleted.filePath,(err)=>{ 
					if (err) return res.json({ success: false, err })
					cb( null );
				})
			},
			function ( cb ) {
				Comment.deleteMany({"postId": req.body.postId}, function(err, docs) {
					if (err) return res.json({ success: false, err })
					cb(null, docs)
				})
			},
		],
		function (err, docs) {
			return res.status(200).json({ success: true, docs })
		});



})

router.post('/getVideoDetail', (req, res) => {

	Video.findOne({ "_id": req.body.postId })
		.populate('writer')
		.exec((err, videoDetail) => {
			if (err) return res.status(400).send(err)
			return res.status(200).json({ success: true, videoDetail })
		})

})

router.get('/getVideos', (req, res) => {
	Video.find()
		.populate('writer')
		.exec((err, videos) => {
			if (err) return res.status(400).send(err);
			res.status(200).json({ success: true, videos })
		})


})

router.post('/thumbnail', (req, res) => {

	let thumbsFilePath = "";
	let fileDuration = "";

	ffmpeg.ffprobe(req.body.url, function (err, metadata) {
		if (err) console.log(err);

		fileDuration = metadata.format.duration;
	})

	ffmpeg(req.body.url)
		.on('filenames', function (filenames) {
			console.log('Will generate ' + filenames.join(', '))
			filePath = "uploads/videos/thumbnails/" + filenames[0];
		})
		.on('end', function () {
			console.log('Screenshots taken');
			return res.json({ success: true, url: filePath, fileDuration: fileDuration })
		})
		.on('error', function (err) {
			console.log(err);
			return res.json({ success: false, err })
		})
		.screenshots({
			// Will take screens at 20%, 40%, 60% and 80% of the video
			count: 1,
			folder: 'uploads/videos/thumbnails',
			size: '320x240',
			// %b input basename ( filename w/o extension )
			filename: 'thumbnail-%b.png'
		});

})

module.exports = router;