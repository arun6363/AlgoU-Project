const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()


const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    }
})

const user = mongoose.model("User",userSchema);

module.exports = user;