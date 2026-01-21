const express = require("express")
const dotenv = require('dotenv')
dotenv.config();
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");

const createtoken = (name)=>{
    let token = jwt.sign({name},process.env.SECRET_KEY,{expiresIn:"5m"});
    return token;
}

module.exports = {

    login : async (req,res)=>{
        const {userName,password} = req.body;
        const user1 = await User.findOne({userName},{userName:1,password:1,userid:1});
        const user2 = await User.findOne({email:userName},{email:1,password:1,userid:1});
        const user = user1 ? user1 : user2;

        if(!user)
            return res.status(400).json({msg:"User not found"})

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)
            return res.status(400).json({msg:"Username or password is Incorrect"})

        const token = createtoken(user.user_id);

        console.log(user);
        return res.status(200).json({user,token});
    },
    
    register:async (req,res)=>{
        const {userName,email,password} = req.body;
        const user1 = await User.findOne({email});
        const user2 = await User.findOne({userName})

        const existinguser = user1? user1 : user2;
        if(existinguser)
            return res.send("User already exists");

        const hashedpassword = await bcrypt.hash(password,10);
        const user = await User.create({userName,email,password:hashedpassword});

        console.log(user);
        res.status(200).json({userName,email,hashedpassword});
    },

    deleteuser: async (req,res) =>{
        const userName = req.params.id;
        // const user1 = await User.findOne({userName},{userName:1})
        // const user2 = await User.findOne({email:userName},{username:1})
        // const user = user1 ? user1 : user2;

        const deleteduser = await User.deleteOne({userName})
        if(deleteduser)
            res.status(200).json(deleteduser)
        return res.status(400).json({msg:"Invalid userdata"})
    },

    protect:(req, res) =>{
        let token;
        let decoded;

        try{
            if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                token = req.headers.authorization.split(' ')[1];
                decoded = jwt.verify(token, process.env.SECRET_KEY);
            }
            res.status(200).json(decoded);
        }catch(err){
            if (err.name === 'TokenExpiredError') {
                console.log('Token expired');
                res.status(404).json({msg:'Token expired',msg1:'Please login again'}
                )
            } else if (err.name === 'JsonWebTokenError') {
                console.log('Invalid token');
                res.status(404).json({msg:'Invalid Token',msg1:'Please login again'})
            } else {
                console.log('Something else went wrong');
                res.status(404).json({msg:'Something else went Wrong',msg1:'Please login again'})
            }
        }
    }
}




