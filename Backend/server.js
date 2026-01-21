// imports
const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const connection = require("./services/db.js")

const authroutes = require("./routes/authRoute.js");


const app = express();

// Middlewares
connection();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/",(req,res)=>{
    res.send("Hello World from Server")
})
app.use("/auth",authroutes);

// server 
const PORT = process.env.PORT || 3000;
app.listen(PORT ,()=>{
    console.log(`Server is running on port: ${PORT}`);
})
