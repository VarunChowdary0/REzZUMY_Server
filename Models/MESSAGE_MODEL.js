const mongoose = require('mongoose');


const _Comments_  = {
    commentBy : String,
    comment : String,
    depth : Number,
    replies : [_Comments_] 
}

const CommentSchema = new mongoose.Schema({
    postID : {
        type : String,
        required : true
    },
    comments : {
        type : [_Comments_],
        default : [] 
    }
})

const COMMENT_MODEL = mongoose.model('_comments_',CommentSchema);
module.exports = COMMENT_MODEL ;