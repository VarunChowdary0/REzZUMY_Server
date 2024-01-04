const express = require('express')
const cors = require('cors');
const { default: helmet } = require('helmet');
const { default: mongoose } = require('mongoose');
const USER_MODEL = require('./Models/UserModel_');
const USER_DATA_MODEL = require('./Models/USER_DATA_MODEL');


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

app.get('/',(_,res)=>{
    console.log('ONLINE -  [ / ] ')
    res.send({server:'online'})
})
app.post('/CreateAccount',(req,res)=>{
    console.log('CreateAccount - [ /CreateAccount ] ')
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
    console.log('LOGIN -[ /Login ] ')
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
    console.log("SAVE DATA - [ /save_data ]")
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
    console.log("GET USER DATA - [ /get_user_data ] ")
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

app.listen(PORT,()=>{
    console.log("Server running on PORT :"+PORT)
})