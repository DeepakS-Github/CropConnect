const express = require('express');
require('../connectDB');
const User = require('./userSchema');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


// SignUp
app.post("/api/user/signup", async(req,res)=>{
    try{
        let data = User(req.body);
        let result = await data.save({ writeConcern: { w: 'majority' } } );
        console.log(result);
        res.send(result);
    } catch(error){
        console.log(error);
        
    }
});


// Login

app.get("/api/user/login/:email/:password", async(req, res)=>{
    try{
        let data = await User.findOne({email :req.params.email, password: req.params.password});
        if(!data){
            res.status(200);
            res.send("Login Unsuccessful");
        }
        else{
            res.status(202).send(data);
        }
    } catch(error){
        res.status(500).send('Something went wrong!');
        console.log(error);
    }
});

app.listen(3600);