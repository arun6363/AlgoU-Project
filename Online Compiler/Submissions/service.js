
// import verdict from "../../Frontend/src/components/verdict.jsx";
import { executeCode } from "./executeCode.js";

const run_testcases = async (req,res)=>{
    const {language,code,testcases} = req.body;
    let passed = 0;
    let results=[];

    // console.log(language,code,testcases)

    for(const tc of testcases){
       const input = tc.input
       const output = await executeCode(language,code,input)
    //    let trimmed_output;

    //    console.log(output)
    //    console.log(output.ouput)
    //    if(!output.error || !output.output){
    //     trimmed_output = output.trim()
    //    }
    
       if(output !== tc.output){
            results.push({
                verdict:"Wrong Answer",
                input:tc.input,
                output:output,
                expectedoutput:tc.output,
                passed,
                failedtestcase:passed+1,
                total_testcases:testcases.length,
            })

            return res.status(200).json(results[0]);
       }
       passed++;
    }

    let passed_testcases =[];
    for(let i =0;i<testcases.length;i++){
        passed_testcases.push("Testcase "+(i+1));
    }

    results.push({
        verdict:"Accepted",
        passed,
        failedtestcase:null,
        total_testcases:testcases.length,
        passed_testcases,
    })

    return res.status(200).json(results[0])
    return res.status(200).json("Succeeded")
}


const run_submission = async (req,res)=>{

}


export { run_submission,run_testcases}