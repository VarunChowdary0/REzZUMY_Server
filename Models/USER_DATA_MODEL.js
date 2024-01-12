const mongoose = require('mongoose')


const education_schema = {
    institue_name : {
        type : String,
        required : true
    },
    institue_site : {
        type : String ,
        required : true
    },
    branch : {
        type : String , 
        required : true 
    },
    Grade : {
        type : String , 
        required : true
    },
    address : {
        type : String , 
        required : true
    },
    time_of_study : {
        type : String , 
        required : true
    }
}

const internship_schema = {
    Title : {
        type : String,
        required : true
    },
    at : {
        type : String,
        required : true
    },
    CertificateLink : {
        type : String,
        required : true
    },
    work_time : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
}

const project_info_schema = {
    Title : {
        type : String,
        required : true
    },
    link : {
        type : String,
        required : true
    },
    git_hub_frontEnd : {
        type : String,
        required : true
    },
    git_hub_BackEnd : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
}

const coding_platforms = {
    Linked_in : {
        link : {
            type : String,
            default : ""
        },
        icon : {
            type : Number,
            default : 0 
        }
    },
    Git_hub : {
        link : {
            type : String,
            default : ""
        },
        icon : {
            type : Number,
            default : 1
        }
    },
    Leet_Code : {
        link : {
            type : String,
            default : ""
        },
        icon : {
            type : Number,
            default : 2
        }
    },
    Code_Chef : {
        link : {
            type : String,
            default : ""
        },
        icon : {
            type : Number,
            default : 3
        }
    },
    Hacker_Rank : {
        link : {
            type : String,
            default : ""
        },
        icon : {
            type : Number,
            default : 4
        }
    },
    GeekforGeeks : {
        link : {
            type : String,
            default : ""
        },
        icon : {
            type : Number,
            default : 5
        }
    },
    Spoj : {
        link : {
            type : String,
            default : ""
        },
        icon : {
            type : Number,
            default : 6
        }
    },
}

const contact_schema = {
    email : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : String,
        required : true
    },
    SocialMediaLinks : {
        instagram : {
            type : String ,
            default : ""
        },
        facebook : {
            type : String ,
            default : ""
        },
        twitter : {
            type : String ,
            default : ""
        },
        linkedin : {
            type : String ,
            default : ""
        },
    }
}
const User_Data_Schema = new mongoose.Schema({
    USER_UID :{
        type : String,
        required : true,
        unique : true
    },
    data : {
        profile : {
            name : {
                type : String,
                required : true
            },
            skills : {
                type : Array,
                default : []
            },
            occupation : {
                type : String,
                default : ""
            },
            profileLink : {
                type : String,
                default : "GIVE A URL HERE"
            },
    
        },
        about : {
            type : String,
            default : " ABOUT ME "
        },
        educationDetails: {
            type: [education_schema],
            default : []
        },        
        internshipDetails : {
            type : [internship_schema],
            default : []
        },
        projectDetails : {
            type : [project_info_schema],
            default : []
        },
        codingPlatform : {
            type : coding_platforms,
            default : {}
        },
        contactDetails : {
            type : contact_schema,
            default :{}
        }
    }
})

const USER_DATA_MODEL = mongoose.model('user_data',User_Data_Schema)

module.exports = USER_DATA_MODEL;