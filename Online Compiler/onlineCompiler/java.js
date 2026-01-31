import path from "path"
import fs from "fs"
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import { exec } from "child_process";

const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const __dirname =  process.cwd();


const dirCodes = path.join(__dirname, 'codes/java');

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}


const generateFile = (format, content) => {
    const jobID = uuidv4();
    const filename = `${jobID}.${format}`;
    const filePath = path.join(dirCodes, filename);
    fs.writeFileSync(filePath, content);
    return filePath;
}


const dirInputs = path.join(__dirname, 'codes/java_inputs');

if (!fs.existsSync(dirInputs)) {
    fs.mkdirSync(dirInputs, { recursive: true });
}

const generate_inputFile = (content) => {
    const jobID = uuidv4();
    const input_filename = `${jobID}.txt`;
    const filePath = path.join(dirInputs, input_filename);
    fs.writeFileSync(filePath, content);
    return filePath;
}

const executeJAVA = (language,code,input="") => {

    const filePath = generateFile(language, code);
    const input_file = generate_inputFile(input)

    return new Promise((resolve, reject) => {

        exec(
            `java "${filePath}" < "${input_file}"`,

            (error, stdout, stderr) => {
                if (error){
                    reject({ error, stderr });
                } 
                if (stderr){
                    reject(stderr);
                } 
                resolve(stdout);
            }
        );
    });
}

export { executeJAVA}