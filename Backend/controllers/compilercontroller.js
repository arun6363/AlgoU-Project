// import express from " express"
import axios from "axios"

const codeRun = async (req, res) => {

  const response = await axios.post(
      "http://localhost:4000/run",
      // "http://oj-compiler:4000/run",
      req.body
    );

    // console.log(response.data);
    if(response.data.error || response.data.error)
      return res.status(400).json(response.data)


    return res.status(200).json(response.data);
}

export { codeRun }