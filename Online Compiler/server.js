import express, { urlencoded } from "express"
import cors from "cors"

// import { executeCode} from "./onlinecompiler.js"
import { executeCode } from "./onlineCompiler/executeCode.js"

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
        console.log(language,code,input)
        const output = await executeCode(language,code,input);
        return res.status(200).json(output) ;

    }catch(err){
        console.log("Error___error:",err)
        return res.status(200).json({error:err,"std":err});
    }
})

app.listen(4000,()=>{
    console.log('Server is running on 4000');
})