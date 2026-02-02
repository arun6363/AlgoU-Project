import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()


const problemSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true,
    },
    title:{
        type:String,
        required:true,
    },
    statement:{
        type:String,
        required:true,
    },
    difficulty:{
        type:String,
        required:true,
        // enum:["Easy","Medium","Hard"],
    },
    input:{
        type:String,
        required:true,
    },
    output:{
        type:String,
        required:true,
    },
    constraints:{
        type:[String],
        required:true,
    },
    tags:{
        type:[String],
        required:true,
    }
})

const problem = mongoose.model("Problem",problemSchema);

export default problem;