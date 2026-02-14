import mongoose from "mongoose"

const testcase = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    input:{
        type:String,
        required:true,
    },
    output:{
        type:String,
        required:true,
    }
})

const Testcase = mongoose.model("Testcase",testcase)
export default Testcase;