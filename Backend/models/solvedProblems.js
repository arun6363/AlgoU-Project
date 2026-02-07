import mongoose from "mongoose"

const SolvedProblem = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    pid:{
        type:String,
        required:true,
    },
    ptitle:{
        type:String,
        required:true,
    }
})

const solvedProblem = mongoose.model("SolvedProblem",SolvedProblem)
export default solvedProblem;