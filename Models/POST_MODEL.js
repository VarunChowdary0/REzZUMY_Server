const mongoose = require('mongoose');

const post_schema = new mongoose.Schema({
    postID : {
        type : String,
        required : true,
        unique : true
    },
    USER_UID : {
        type : String,
        required : true
    },
    identifiers : {
        type : Array,
        default : []
    },
    type : {
        type: String,
        required:true
    },
    name : {
        type : String,
        required : true
    },
    occupation : {
        type : String,
        required:true
    },
    postHeight : {
        type : Number,
        default : 450
    },
    profileLink : {
        type : String,
        required : true
    },
    Paras : {
        type : Array,
        default : []
    },
    tags : {
        type : Array,
        default : []
    },
    images : {
        type : Array,
        default : []
    },
    likedBy: {
        type: [{
          type: String,
          unique: true
        }],
        default: []
    },
    
    Post_code : {
        type : String,
        default : "",
    },
    prjInfo : {
        type : {
            imgLink : {
                type : String,
                default : "",
            },
            prjLink : {
                type : String,
                default : ""
            },
            githubLink : {
                type : String,
                default : ""
            }
        },
        default : {}
    },
    noOfStars: {
        type: Number,
        default: function() {
            return this.likedBy.length;
        }
    },
    noofCommas : {
        type : Number,
        default : 0,
    },
    noOfShares : {
        type : Number,
        default : 0,
    },
    isProcessed : {
        type : Boolean,
        default : false
    }
})

const POST_MODEL = 
mongoose.model('posts',post_schema);

module.exports = POST_MODEL;