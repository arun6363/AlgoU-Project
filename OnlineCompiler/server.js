import express, { urlencoded } from "express"
import cors from "cors"

import { executeCode } from "./onlineCompiler/executeCode.js"
import { run_testcases,run_submissions } from "./service.js" 

const app = express()

app.use(cors())
app.use(express.json())
app.use(urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("Hello World from server")
})

app.post("/run", async (req,res)=>{

    const {language,code,input} = req.body;
    try{
        const output = await executeCode(language,code,input);
        return res.status(200).json(output) ;

    }catch(err){
        console.log("Error___error:",err)
        return res.status(200).json({error:err,"std":err});
    }
})

app.post("/run-testcases",run_testcases)
app.post("/run-submissions",run_submissions)

app.listen(4000,()=>{
    console.log('Server is running on 4000');
})