const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

router.post('/saveComment', (req, res) => {
    
  const comment = new Comment(req.body)
  
  comment.save((err, comment) => {

      if(err) return res.json({ success : false, err })
    
      Comment.find({ "postId" : req.body.postId })
        .populate('writer')
        .exec(( err, comments ) => {
          if(err) return res.status(400).send(err)
          
          res.status(200).json({ success : true, comments})
        })

          // Comment.find({ '_id' : comment._id })
          //   .populate('writer')
          //   .exec((err, result) => {
                
          //       if(err) return res.json({ success : false, err })
          //       res.status(200).json({ success : true, result })

          //   })
      
  })

})


router.post('/getComments', (req, res) => {

  Comment.find({ "postId" : req.body.postId })
    .populate('writer')
    .exec(( err, comments ) => {
      if(err) return res.status(400).send(err)
      
      res.status(200).json({ success : true, comments})
    })

})

router.post('/deleteComment', (req, res) => {

  Comment.findOneAndUpdate({ _id: req.body._id },
    { content: "[삭제된 댓글입니다]" }
    , (err, user) => {
      if (err) return res.json({ success: false, err })

      Comment.find({ "postId": req.body.postId })
        .populate('writer')
        .exec((err, comments) => {
          if (err) return res.status(400).send(err)

          res.status(200).json({ success: true, comments })
        })
    })

  // Comment.findOneAndDelete({ "_id": req.body._id }, function (err, docs) {

  //   if(err) return res.json({ success : false, err })
    
  //   console.log(req.body.postId)
  //   Comment.find({ "postId" : req.body.postId })
  //   .populate('writer')
  //   .exec(( err, comments ) => {
  //     if(err) return res.status(400).send(err)
      
  //     res.status(200).json({ success : true, comments})
  //   })

  // });

})


module.exports = router;


