
import { executeCPP } from "./cpp.js";
import { executeJAVA } from "./java.js";
import { executePYTHON } from "./python.js";


const executeCode = async (language, code, input) => {

    if (language === "cpp") {
        const output = await executeCPP(language, code, input);
        console.log(output)
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

export { executeCode }