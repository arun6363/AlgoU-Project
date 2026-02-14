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

const executeJAVA_Dummy = async (code, input = "") => {
  const jobId = uuidv4();
  const jobDir = path.join(codesRoot, jobId);
  await fs.mkdir(jobDir, { recursive: true });

  const codeFile = path.join(jobDir, "Main.java");
  const inputFile = path.join(jobDir, "input.txt");

  await fs.writeFile(codeFile, code);
  await fs.writeFile(inputFile, input);

  try {
    // 1️⃣ Compile
    try {
      await execPromise(`javac "${codeFile}"`, { cwd: jobDir });
    } catch (compileError) {
      throw { type: "CE", error: compileError.stderr || compileError.message };
    }

    // 2️⃣ Execute
    const runCmd = `bash -c 'java -Xmx256m -cp "${jobDir}" Main < "${inputFile}"'`;

    try {
      const { stdout, stderr } = await execPromise(runCmd, {
        timeout: TIME_LIMIT_MS,
        maxBuffer: 128 * 1024 * 1024,
      });

      if (stderr) throw { type: "CE", error: stderr };
      return stdout;

    } catch (error) {
      if (error.killed) {
        throw { type: "TLE", error: "Time Limit Exceeded" };
      } else if (error.code === 137) {
        throw { type: "MLE", error: "Memory Limit Exceeded" };
      } else if (error.stderr) {
        throw { type: "RTE", error: error.stderr };
      } else {
        // throw { type: "RTE", error: error.message };
        throw { type: "LTE", error: "Memory Limit Exceeded" };
      }
    }

  } catch (err) {
    return err;
  } finally {
    await fs.rm(jobDir, { recursive: true, force: true });
  }
};


export {executeJAVA_Dummy}
