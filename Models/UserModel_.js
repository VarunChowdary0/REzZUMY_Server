const mongoose = require('mongoose')

const USER_SCHEMA = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        requiredSER : true,
    },
    mail : {
        type : String,
        required : true,
        unique : true,
        minLength : 7,
    },
    USER_UID : {
        type : String,
        required : true
    },
    PostsArray : {
        type : Array,
        default : []
    }
})

const USER_MODEL =
mongoose.model('user_info',USER_SCHEMA);

module.exports = USER_MODEL;