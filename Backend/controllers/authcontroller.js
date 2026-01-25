import express from "express"
import dotenv from 'dotenv'
import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

import { body } from "express-validator";
import user from "../models/User.js"

dotenv.config();

const createtoken = (name)=>{
    let token = jwt.sign({name},process.env.SECRET_KEY,{expiresIn:"5m"});
    return token;
}

export const registerValidationRules = () =>
    [
        body("username")
            .isLength({ min: 4 })
            .withMessage("Username must be at least 4 characters")
            .notEmpty()
            .withMessage("Username is required"),
        body("email")
            .notEmpty()
            .withMessage("Email is required"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters")
            .notEmpty()
            .withMessage("Password is required"),
    ]

export const loginValidationRules = () =>
    [
        body("username")
            .notEmpty()
            .withMessage("Username is required"),
        body("password")
            .notEmpty()
            .withMessage("Password is required")
    ]

export const updateValidationRules = () =>
    [
        body("username")
            .isLength({ min: 4 })
            .withMessage("Username must be at least 4 characters")
            .notEmpty()
            .withMessage("Username is required"),
        body("newpassword")
        .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters")
            .notEmpty()
            .withMessage("password is required"),
        body("confirmpassword")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters")
            .notEmpty()
            .withMessage("Password is required"),
    ]



const login = async (req,res)=>{

        const { username,password} = req.body;
        const identifier = username;

        const user = await User.findOne({
            $or: [{ username :identifier}, { email: identifier }],
        });

        if(!user)
            return res.status(400).json({msg:"User not found"})

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch)
            return res.status(400).json({msg:"username or password is Incorrect"})

        const token = createtoken(user.user_id);
        return res.status(200).json({user,token,msg:"Login Successfull"});
    }
    
const register = async (req,res)=>{
        const {username,email,password} = req.body;
        const user1 = await User.findOne({email});
        const user2 = await User.findOne({username})

        const existinguser = user1 ? user1 : user2;
        if(existinguser)
            return res.status(400).json({msg : "User already exists"});

        const hashedpassword = await bcrypt.hash(password,10);
        const user = await User.create({username,email,password:hashedpassword});

        res.status(200).json({username,email,hashedpassword});
    }

const deleteuser = async (req,res) =>{
        const username = req.params.id;

        const deleteduser = await User.deleteOne({username})
        if(deleteduser)
            res.status(200).json(deleteduser)
        return res.status(400).json({msg:"Invalid userdata"})
    }

const protect = (req, res) =>{
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
                res.status(404).json({msg:'Token expired',msg1:'Please login again'}
                )
            } else if (err.name === 'JsonWebTokenError') {
                res.status(404).json({msg:'Invalid Token',msg1:'Please login again'})
            } else {
                res.status(404).json({msg:'Something else went Wrong',msg1:'Please login again'})
            }
        }
    }

const updatepassword = async (req,res)=>{

    const {username,newpassword,confirmpassword} = req.body;
    const identifier = username;

        
        const user = await User.findOne({
            $or: [{ username :identifier}, { email: identifier }],
        },);

        if(!user)
            return res.status(400).json({msg:"User not found"})

        if(newpassword !== confirmpassword)
            return res.status(400).json({msg:"Passwords don't match"})

        const hashpass = await bcrypt.hash(confirmpassword,10);

        if(await bcrypt.compare(confirmpassword,user.password))
            return res.status(400).json({msg:"password is same as old password"})

        user.password = hashpass;
        user.save();

        // const result = await User.updateOne({email:identifier },{username:identifier},{
        //     $set :{password:hashpass}
        // })

        return res.status(200).json({msg:"password updated successfully"});
}

export {login,register,protect,deleteuser,updatepassword}




