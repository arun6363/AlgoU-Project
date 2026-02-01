// imports
import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"
import connection from "./services/db.js"
import authroutes from "./routes/authRoute.js"
import compileroutes from "./routes/compilerRoute.js"
import problemroutes from "./routes/problemRoute.js"
import cookieParser from "cookie-parser"

dotenv.config();
const app = express();

// Middlewares
connection();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// routes
app.get("/",(req,res)=>{
    res.send("Hello World from Server")
})
app.use("/auth",authroutes);
app.use("/compiler",compileroutes)
app.use("/problems",problemroutes)

// server 
const PORT = process.env.PORT || 3000;
app.listen(PORT ,()=>{
    console.log(`Server is running on port: ${PORT}`);
})
