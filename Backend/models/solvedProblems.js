import mongoose from "mongoose"

const solvedProblem = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    id:{
        type:Number,
        required:true,
    },
    title:{
        type:String,
        required:true,
    }
})

const SolvedProblem = mongoose.model("SolvedProblem",solvedProblem)
export default SolvedProblem;