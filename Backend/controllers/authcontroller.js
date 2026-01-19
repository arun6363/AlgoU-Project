const express = require("express")
const dotenv = require('dotenv')
dotenv.config();

const jwt = require("jsonwebtoken")

const createtoken = (name)=>{
    let token = jwt.sign({name},process.env.SECRET_KEY,{expiresIn:"5m"});
    return token;
}

module.exports = {

    login : (req,res)=>{
        const {email,password} = req.body;
        console.log(email,password);
        res.status(200).json({email,password});
    },
    
    register: (req,res)=>{
        const {email,password} = req.body;
        const token = createtoken(email);
        console.log(email,password);
        res.status(200).json({email,password,token});
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




