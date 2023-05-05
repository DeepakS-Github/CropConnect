const express = require('express');
require("../connectDB");
const Farmer = require('./farmerSchema');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


// SignUp
app.post("/api/farmer/signup", async(req,res)=>{
    try{
        let data = Farmer(req.body);
        let result = await data.save();
        console.log(result);
        res.send(result);
    } catch(error){
        res.status(500).send('Something went wrong!');
        console.log(error);
    }
});


// Login
app.get("/api/farmer/login/:email/:password", async(req, res)=>{
    try{
        let data = await Farmer.findOne({email :req.params.email, password: req.params.password});
        if(!data){
            res.status(300);
            res.send("Login Unsuccessful");
        }
        else{
            res.status(302).send(data);
        }
    } catch(error){
        res.status(500).send('Something went wrong!');
    }
});


// Get Farmer Data using its Id
app.get("/api/farmer/getFarmerData/:key", async(req, res)=>{
    try{
        let data = await Farmer.findOne({_id :req.params.key});
        res.status(400).send(data);
    } catch(error){
        res.status(500).send('Something went wrong!');
    }
});


app.listen(3700);