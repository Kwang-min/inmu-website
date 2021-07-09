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
    { isDeleted: true }
    , (err, user) => {
      if (err) return res.json({ success: false, err })

      Comment.find({ "postId": req.body.postId })
        .populate('writer')
        .exec((err, comments) => {
          if (err) return res.status(400).send(err)

          res.status(200).json({ success: true, comments })
        })
    })

})

router.post('/updateComment', (req, res) => {
  console.log('hoihoihoihoi')
  Comment.findOneAndUpdate({ "_id": req.body._id },
    {
      content: req.body.content
    }
    , (err, doc) => {
      if (err) return res.json({ success: false, err })
      Comment.find({ "postId": req.body.postId })
        .populate('writer')
        .exec((err, comments) => {
          if (err) return res.status(400).send(err)

          res.status(200).json({ success: true, comments })
        })
    })

})


module.exports = router;


