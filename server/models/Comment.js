const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const commentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        // ref:'User'
        ref:'Comment'
    },
    content : {
        type: String
    },
    isDeleted: {    
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment  }