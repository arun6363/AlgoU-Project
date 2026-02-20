import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { spawn } from "child_process";
import os from "os";

const __dirname = process.cwd();
const codesRoot = path.join(__dirname, "codes");
await fs.mkdir(codesRoot, { recursive: true });

const TIME_LIMIT_MS = 2000;       // 2 seconds
const MEMORY_LIMIT_KB = 256 * 1024; // 256 MB

const executeCPP_Spawn = async (code, input = "") => {
  const jobId = uuidv4();
  const jobDir = path.join(codesRoot, jobId);
  await fs.mkdir(jobDir, { recursive: true });

  const codeFile = path.join(jobDir, "main.cpp");
  const inputFile = path.join(jobDir, "input.txt");
  const outputFile = path.join(jobDir, "program.out");

  await fs.writeFile(codeFile, code);
  await fs.writeFile(inputFile, input);

  try {
    // 1️⃣ Compile C++ code
    await new Promise((resolve, reject) => {
      const compile = spawn("g++", [codeFile, "-o", outputFile]);

      let compileErr = "";
      compile.stderr.on("data", (data) => (compileErr += data.toString()));

      compile.on("close", (code) => {
        if (code !== 0) reject({ type: "CE", error: compileErr });
        else resolve();
      });
    });

    // 2️⃣ Execute compiled program
    return await new Promise((resolve, reject) => {
      // Linux only memory limit
      const isLinux = os.platform() === "linux";
      const command = isLinux
        ? `bash`
        : outputFile; // macOS/Windows fallback (memory limit not supported)

      const args = isLinux
        ? ["-c", `ulimit -v ${MEMORY_LIMIT_KB} && "${outputFile}" < "${inputFile}"`]
        : []; // macOS: just spawn the program directly

      const run = isLinux
        ? spawn(command, args, { stdio: ["pipe", "pipe", "pipe"] })
        : spawn(command, { stdio: ["pipe", "pipe", "pipe"], cwd: jobDir });

      let stdout = "";
      let stderr = "";

      run.stdout.on("data", (data) => (stdout += data.toString()));
      run.stderr.on("data", (data) => (stderr += data.toString()));

      // TLE timer
      const timer = setTimeout(() => {
        run.kill("SIGKILL");
        reject({ type: "TLE", error: "Time Limit Exceeded" });
      }, TIME_LIMIT_MS);

      run.on("close", (code) => {
        clearTimeout(timer);

        if (code !== 0 && stderr) reject({ type: "RTE", error: stderr });
        else resolve(stdout);
      });
    });
  } finally {
    // 3️⃣ Cleanup temp folder
    await fs.rm(jobDir, { recursive: true, force: true });
  }
};

export { executeCPP_Spawn };











// import path from "path";
// import fs from "fs/promises";
// import { v4 as uuidv4 } from "uuid";
// import { spawn } from "child_process";
// import os from "os";

// const __dirname = process.cwd();
// const codesRoot = path.join(__dirname, "codes");
// await fs.mkdir(codesRoot, { recursive: true });

// const TIME_LIMIT_MS = 2000;       // 2 seconds
// const MEMORY_LIMIT_KB = 256 * 1024; // 256 MB

// const executeCPP = async (code, input = "") => {
//   const jobId = uuidv4();
//   const jobDir = path.join(codesRoot, jobId);
//   await fs.mkdir(jobDir, { recursive: true });

//   const codeFile = path.join(jobDir, "main.cpp");
//   const inputFile = path.join(jobDir, "input.txt");
//   const outputFile = path.join(jobDir, "program.out");

//   await fs.writeFile(codeFile, code);
//   await fs.writeFile(inputFile, input);

//   try {
//     // 1️⃣ Compile
//     try {
//       await new Promise((resolve, reject) => {
//         const compile = spawn("g++", [codeFile, "-o", outputFile]);

//         let compileErr = "";
//         compile.stderr.on("data", (data) => (compileErr += data.toString()));

//         compile.on("close", (code) => {
//           if (code !== 0) reject({ type: "CE", error: compileErr });
//           else resolve();
//         });
//       });
//     } catch (compileError) {
//       return {
//         verdict: "CE",
//         stdout: "",
//         stderr: compileError.error,
//       };
//     }

//     // 2️⃣ Execute
//     return await new Promise((resolve) => {
//       const isLinux = os.platform() === "linux";

//       const command = isLinux ? "bash" : outputFile;
//       const args = isLinux
//         ? ["-c", `ulimit -v ${MEMORY_LIMIT_KB} && "${outputFile}" < "${inputFile}"`]
//         : [];

//       const run = isLinux
//         ? spawn(command, args, { stdio: ["pipe", "pipe", "pipe"] })
//         : spawn(command, { stdio: ["pipe", "pipe", "pipe"], cwd: jobDir });

//       let stdout = "";
//       let stderr = "";

//       run.stdout.on("data", (data) => (stdout += data.toString()));
//       run.stderr.on("data", (data) => (stderr += data.toString()));

//       const timer = setTimeout(() => {
//         run.kill("SIGKILL");
//         resolve({
//           verdict: "TLE",
//           stdout,
//           stderr: "Time Limit Exceeded",
//         });
//       }, TIME_LIMIT_MS);

//       run.on("close", (code, signal) => {
//         clearTimeout(timer);

//         if (signal === "SIGKILL") {
//           resolve({
//             verdict: "TLE",
//             stdout,
//             stderr: "Time Limit Exceeded",
//           });
//         } else if (code === 137) {
//           resolve({
//             verdict: "MLE",
//             stdout,
//             stderr: "Memory Limit Exceeded",
//           });
//         } else if (code !== 0 && stderr) {
//           resolve({
//             verdict: "RTE",
//             stdout,
//             stderr,
//           });
//         } else {
//           resolve({
//             verdict: "OK",
//             stdout,
//             stderr,
//           });
//         }
//       });
//     });
//   } finally {
//     // 3️⃣ Cleanup
//     await fs.rm(jobDir, { recursive: true, force: true });
//   }
// };

// export { executeCPP };
