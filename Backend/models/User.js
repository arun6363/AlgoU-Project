import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()


const userSchema = new mongoose.Schema({
    username:{
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

export default user;