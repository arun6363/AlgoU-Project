
import { executeCPP_Dummy } from "./cpp_dummy.js";
import { executeJAVA_Dummy } from "./java_dummy.js";
import { executePYTHON_Dummy } from "./python_dummy.js";

const executeCode = async (language, code, input) => {

    if (language === "cpp") {
        // const output = await executeCPP(language, code, input);
        const output = await executeCPP_Dummy(code,input);
        // const output = await executeCPP_Spawn(code,input="");
        return output;
    }
    else if (language === "java") {
        // const output = executeJAVA(language, code,input);
        const output = await executeJAVA_Dummy(code,input);
        return output;
    }
    else if (language === "py") {
        // const output = await executePYTHON(language, code, input)
        const output = await executePYTHON_Dummy(code,input);
        // console.log(output);
        return output;
    }
}

export { executeCode }