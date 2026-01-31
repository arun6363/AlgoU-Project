import path from "path"
import fs from "fs"
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import { exec,spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const __dirname =  process.cwd();
// console.log("Root directory:", rootDir);
console.log(__dirname)


const dirCodes = path.join(__dirname, 'codes/c++');

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const outputPath = path.join(__dirname, "codes/c++_outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const generateFile = (format, content) => {
    const jobID = uuidv4();
    const filename = `${jobID}.${format}`;
    const filePath = path.join(dirCodes, filename);
    fs.writeFileSync(filePath, content);
    return filePath;
}



const dirInputs = path.join(__dirname, 'codes/cpp_inputs');

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

const executeCPP = (language,code,input="") => {

    const filePath = generateFile(language, code);

    const jobId = path.basename(filePath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);
    const input_file = generate_inputFile(input)
    // console.log(outPath);

    return new Promise((resolve, reject) => {
        exec(
            `g++ "${filePath}" -o "${outPath}" && cd "${outputPath}" && .//"${jobId}.out" < "${input_file}"`,
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            }
        );
    });
}

export {executeCPP}