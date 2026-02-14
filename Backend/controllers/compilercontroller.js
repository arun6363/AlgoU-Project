// import express from " express"
import axios from "axios"


function cleanCppErrors(stderr) {
  const lines = stderr.split("\n");

  let result = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("error:")) {
      // Clean file path
      const cleanedPath = lines[i].replace(/^.*\/(main\.cpp)/, "$1");
      result.push(cleanedPath);

      // Add next line if it contains code snippet
      if (lines[i + 1] && lines[i + 1].includes("|")) {
        result.push(lines[i + 1].trim());
      }
    }
  }

  return result.join("\n");
}

function cleanJavaErrors(stderr) {
  return stderr
    .split("\n")
    .map(line =>
      line.replace(/^.*\/[^/]+\.java/, "main.java")
    )
    .filter(line => line.includes("error:"))
    .join("\n");
}

function cleanPythonErrors(stderr) {
  const lines = stderr.split("\n");
  let result = [];

  let fileLine = null;
  let codeLine = null;
  let errorLine = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Match: File ".../filename.py", line 2
    const fileMatch = line.match(/File ".*\/[^/]+\.py", line (\d+)/);
    if (fileMatch) {
      fileLine = fileMatch[1];
      codeLine = lines[i + 1]?.trim();   // next line is code
    }

    // Match SyntaxError or any Error
    if (line.includes("Error")) {
      errorLine = line.trim();
    }
  }

  if (fileLine && errorLine) {
    result.push(`main.py:${fileLine}: ${errorLine}`);
    if (codeLine) {
      result.push(`${fileLine} | ${codeLine}`);
    }
  }

  return result.join("\n");
}




const codeRun = async (req, res) => {
  const {language } = req.body;
  const response = await axios.post(
      "http://localhost:4000/run",
      // "http://oj-compiler:4000/run",
      req.body
    );

    console.log(response.data);
    const {type,error} = response.data;

    if(language === "py"){
      const {type,error} = response.data;
      if(!error) return res.status(200).json(response.data);
      // if(type !== "RTE") res.status(400).json(error);
       if(type === "RTE" && (error!== "Time Limit Exceeded" || error!=="Memory Limit Exceeded") && error!=='stdout maxBuffer length exceeded'){
        const cleanerrors = cleanPythonErrors(response.data.error)
        return res.status(400).json(cleanerrors)
      }
      return res.status(400).json(error)
    }

    if(language === "java"){
      const {type,error} = response.data;
      if(!error) return res.status(200).json(response.data);
      if(type === "CE"){
        const cleanerrors = cleanJavaErrors(response.data.error)
        return res.status(400).json(cleanerrors)
      }
      return res.status(400).json(error);
    }

    if(language === "cpp"){
      const {type,error} = response.data;
      if(!error) return res.status(200).json(response.data);
      if(type === "CE"){
        const cleanerrors = cleanCppErrors(response.data.error)
        return res.status(400).json(cleanerrors)
      }
      return res.status(400).json(error);
    }


    return res.status(200).json(response.data);
}



const run_testcases = async (req, res) => {
  const {language } = req.body;
  const response = await axios.post(
      "http://localhost:4000/run-testcases",
      // "http://oj-compiler:4000/run",
      req.body
    );

    console.log("response:",response.data);
    // const {type,error} = response.data;

    if(language === "py"){
      const output = response.data.output;
      if(!output) return res.status(200).json(response.data);
      if(!output.type) return res.status(200).json(response.data);

       if(output.type === "RTE" && (output.error!== "Time Limit Exceeded" || output.error!=="Memory Limit Exceeded") && output.error!=='stdout maxBuffer length exceeded'){
        const cleanerrors = cleanPythonErrors(output.error)
        return res.status(400).json(cleanerrors)
      }
      return res.status(400).json(output.error)
    }

    if(language === "java"){
    const output = response.data.output;
      if(!output) return res.status(200).json(response.data);
      if(!output.type) return res.status(200).json(response.data);
     if(output.type === "CE"){
        const cleanerrors = cleanJavaErrors(output.error)
        return res.status(400).json(cleanerrors)
      }
      return res.status(400).json(output.error);
    }

    if(language === "cpp"){
      const output = response.data.output;
      if(!output) return res.status(200).json(response.data);
      if(!output.type) return res.status(200).json(response.data);
      if(output.type === "CE"){
        const cleanerrors = cleanCppErrors(output.error)
        return res.status(400).json(cleanerrors)
      }
      return res.status(400).json(output.error);
    }


    return res.status(200).json(response.data);
}

export { codeRun, run_testcases}