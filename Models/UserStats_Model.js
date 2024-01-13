const mongoose = require('mongoose');

const user_stats = new mongoose.Schema({
    USER_UID : {
        type : String , 
        required : true
    },
    connections : {
        type : [
            {
                name : {
                    type :String,
                    required :true
                },profileLink : {
                    type : String,
                    required : true
                },
                Connection_USER_UID : {
                    type : String,
                    required :true
                },
                occupation : {
                    type :String,
                    required : true,
                    unique : true
                },
                mail : {
                    type : String,
                    required : true,
                    unique : true,
                    minLength : 7,
                }
            }
        ],

    },
    credit_score : {
        type : Number,
        default : 0
    },
    contributions : {
        type : Array,
        default : []
    }
})