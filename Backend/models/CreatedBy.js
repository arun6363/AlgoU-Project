import mongoose from "mongoose"

const CreatedBy = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    id:{
        type:Number,
        required:true,
    },
})

const createdBy = mongoose.model("CreatedBy",CreatedBy)
export default createdBy;