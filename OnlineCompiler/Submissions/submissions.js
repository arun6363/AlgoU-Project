
import { executeCPP } from "./cpp.js";
import { executeJAVA } from "./java.js";
import { executePYTHON } from "./python.js";
import { executeCPP_Dummy } from "./dummy.js";
import { executeCPP_Spawn } from "./spawn.js";


const submitCode = async (language, code, input) => {

    if (language === "cpp") {
        // const output = await executeCPP(language, code, input);
        // const output = await executeCPP_Dummy(code,input);
        const output = await executeCPP_Spawn(code,input="");
        return output;
    }
    else if (language === "java") {
        const output = executeJAVA(language, code,input);
        return output;
    }
    else if (language === "py") {
        const output = await executePYTHON(language, code, input)
        // console.log(output);
        return output;
    }
}

export { submitCode }