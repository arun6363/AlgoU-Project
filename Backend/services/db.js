const mongoose = require("mongoose")

const dbconnection = async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE)
        console.log("MongoDB connected successfully");
    }catch(error){
        console.log(error.message);
    }
}

module.exports = dbconnection;