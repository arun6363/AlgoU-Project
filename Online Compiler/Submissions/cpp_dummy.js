import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

const __dirname = process.cwd();
const codesRoot = path.join(__dirname, "codes");
await fs.mkdir(codesRoot, { recursive: true });

const TIME_LIMIT_MS = 2000;      // 2 sec
const MEMORY_LIMIT_KB = 262144;  // 256 MB

const executeCPP_Dummy = async (code, input = "") => {
  const jobId = uuidv4();
  const jobDir = path.join(codesRoot, jobId);
  await fs.mkdir(jobDir, { recursive: true });

  const codeFile = path.join(jobDir, "main.cpp");
  const inputFile = path.join(jobDir, "input.txt");
  const outputFile = path.join(jobDir, "program.out");

  await fs.writeFile(codeFile, code);
  await fs.writeFile(inputFile, input);

  try {
    // 1️⃣ Compile
    try {
      await execPromise(`g++ "${codeFile}" -o "${outputFile}"`);
    } catch (compileError) {
      throw { type: "CE", error: compileError.stderr || compileError.message };
    }

    // 2️⃣ Execute with TLE and memory limit
    // ulimit -v <MEMORY_LIMIT_KB> → memory limit
    const runCmd = `bash -c '"${outputFile}" < "${inputFile}"'`;

    try {
      const { stdout, stderr } = await execPromise(runCmd, {
        timeout: TIME_LIMIT_MS,   // TLE in milliseconds
        maxBuffer: 12 * 1024 * 1024,   // 1 MB output limit
      });

      if (stderr) throw { type: "RTE", error: stderr };
      return stdout;
    } catch (error) {
      console.log(error)
      if (error.code === 139) {
        console.log("seg Error");
        throw { type: "SEG", error: "Segmentation Fault (SIGSEGV)" };
        // error: 'Segmentation Fault (SIGSEGV)'
      }
      if (error.killed) {
        throw { type: "TLE", error: "Time Limit Exceeded" };
      } else if (error.code === 137) {
        // Exit code 137 = killed due to memory limit
        throw { type: "MLE", error: "Memory Limit Exceeded" };
      } else if (error.stderr) {
        throw { type: "RTE", error: error.stderr };
      } else {
        // throw { type: "LTE", error: error.message };
        throw { type: "LTE", error: "Memory Limit Exceeded" };
      }
    }
  } catch (err) {
    return err;
  } finally {
    // 🧹 Cleanup
    await fs.rm(jobDir, { recursive: true, force: true });
  }
};

export { executeCPP_Dummy };
