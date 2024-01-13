const express = require('express')
const cors = require('cors');
const { default: helmet } = require('helmet');
const { default: mongoose } = require('mongoose');
const USER_MODEL = require('./Models/UserModel_');
const USER_DATA_MODEL = require('./Models/USER_DATA_MODEL');
const POST_MODEL = require('./Models/POST_MODEL');


const app = express();

app.use(helmet());
app.use(cors({
    origin:true
}));
app.use(express.json())

const DatabaseConnection = 
`mongodb+srv://${'rezzumy'}:${"9392704248"}@cluster0.epypnho.mongodb.net/REzZUMY_DB?retryWrites=true&w=majority` ;

mongoose.connect(DatabaseConnection)
    .then((res)=>{
        console.log("Data base connection SUCCESSFULL !! ");
    })
    .catch((err)=>{
        console.log("Data base connection FAILED :-> "+err)
    })

const PORT = process.env.PORT || 9898

let count = 0;

app.get('/',(_,res)=>{
    count++;
    console.log('ONLINE -  [ / ] -'+count)
    res.send({server:'online'})
})
app.post('/CreateAccount',(req,res)=>{
    count++;
    console.log('CreateAccount - [ /CreateAccount ] -'+count)
    const _data_ = req.body
    USER_MODEL.create(_data_)
        .then((resp)=>{
            console.log('SUCCESSFUL')
            res.status(200).json({message:"USER CREATED"})
        })
        .catch((err)=>{
            console.log("FAILED")
            res.status(400).json({message:" INFO ALREADY EXISTS "})
        })
})
app.post('/Login',(req,res)=>{
    count++;;
    console.log('LOGIN -[ /Login ] -'+count)
    const _data_ = req.body
    USER_MODEL.findOne(_data_)
        .then((response)=>{
            if(response === null ){
                res.status(200).json({message:" INVALID CREDENTIALS "})
                console.log(" INVALID ")
            }
            else{
                res.status(200).json({message:"OK",USER_UID:response.USER_UID}) // also send USER_UID to client ; //done
                console.log(" LOGGED IN ")
            }
        })
        .catch((error)=>{
            res.status(500).json({message:" Something went wrong "})
            console.log(" SERVER ERROR ")
        })
})

app.post('/save_data',(req,res)=>{
    count++;;
    console.log("SAVE DATA - [ /save_data ] -"+count)
    const _data_ = req.body;
    const USER_UID=_data_.USER_UID;
    USER_DATA_MODEL.findOneAndUpdate(
        {USER_UID:USER_UID},
        {data : _data_.data},
        {upsert:true}
    )
    .then((response)=>{
        res.status(200).json({message:"OK"})
    })
    .catch((err)=>{
        console.log(err)
        res.status(400).json({message:"FAILED"})
    })

})

app.post('/get_user_data',(req,res)=>{
    const USER_UID = req.body;
    count++;;
    console.log("GET USER DATA - [ /get_user_data ] -"+count)
    console.log(USER_UID)
    USER_DATA_MODEL.findOne(USER_UID)
        .then((response)=>{
            if (response === null ){
                res.status(200).json({message:"NEW USER"})
            }
            else{
                res.status(200).json({message:"OK",data:response.data})
            }
        })
        .catch((err)=>{
            console.log(err)
            res.status(404).json({message:"SOMETHING WENT WRONG"})
        })
})

app.post('/upload_new_post',(req,res)=>{
    count++;
    console.log("UPLOAD_NEW_POST__"+count);
    const post_data = req.body.data;
    // console.log(post_data)
    // console.log(post_data.USER_UID)
    // console.log(post_data.postID)
    // console.log(post_data)
    // Create new post
    // Add post ID to the users post array ;
    POST_MODEL.create(post_data)
        .then((reponse)=>
        {
            USER_MODEL.findOneAndUpdate(
                {USER_UID:post_data.USER_UID},
                { $push: {PostsArray:post_data.postID}},
                {new : true}
                )
                .then((resp)=>{
                    console.log(resp);
                    res.status(200).json({message:"ok"})
                })
                .catch((err)=>{
                    console.log(err)
                    res.status(400).json({message:"NO",error:err})
                })
        })
        .catch((error)=>{
            console.log(error);
            res.status(400).json({message:"NO",error:error})

        })
    
})

app.get('/get_all_posts',(req,res)=>{
    count++;
    console.log("GET_ALL_POSTS _ "+count);
    POST_MODEL.find({})
        .then((response)=>{
            // console.log(response);
            res.status(200).json({message:"OK",response})
        })
        .catch((err)=>{
            console.log("Error",err);
            res.status(500).json({message:"NO"})
        })
})

// app.post('/get_user_posts_info',(req,res)=>{
//     const USER_UID = req.data;
//     count++;
//     console.log("GET_USERS_POST - "+count);
//     USER_MODEL.findOne(USER_UID)
//         .then((response)=>{
//             // console.log(response);
//             res.status(200).json({message:"FOUND",data:response.PostsArray})
//         })
//         .catch((err)=>{
//             console.log(err);
//             res.status(404).json({message:"Not Found"});
//         })
// })
app.post('/get_all_posts_of_user',(req,res)=>{
    const USER_UID = req.body;
    count++;
    console.log("GET_POSTS_OF_USER - "+count);
    POST_MODEL.find(USER_UID)
        .then((response)=>{
            // console.log(response)
            res.status(200).json({message:"OK",data:response});
        })
        .catch((err)=>{
            res.status(404).json({message:"NO"});
        })
})
app.listen(PORT,()=>{
    console.log("Server running on PORT :"+PORT)
})