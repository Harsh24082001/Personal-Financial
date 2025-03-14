const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app =express();
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactionRoutes');
const userModel =require("./Models/user.js")

app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(transactionRoutes);
mongoose.connect('mongodb://localhost:27017/user');

// Login Authentication
app.post('/login',(req,res)=>{
    const {email,pass}=req.body;
    userModel.findOne({email:email})
    .then(user => {
        if(user){
            if (user.pass === pass) {
                res.json("Success")
            } else {
                res.json("incorrect password")
            }
        }else{
            res.json("No Record please register")
        }
    }) 
})

// Signup Authentication
app.post('/signup',(req,res)=>{
    userModel.create(req.body).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    });
})

app.listen(3030,()=>{
    console.log("Server is Started")
})