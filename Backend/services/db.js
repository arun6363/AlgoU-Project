import mongoose from "mongoose"

const dbconnection = async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE)
        console.log("MongoDB connected successfully");
    }catch(error){
        console.log(error.message);
    }
}

export default dbconnection;