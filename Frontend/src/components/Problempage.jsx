import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import AuthAlert from './AuthAlert';
import Testcase from './Testcase';
import Verdict from './verdict';


import "../styles/problempage.css"
import { useState } from 'react';
import axios from 'axios';

import { useDispatch, useSelector } from "react-redux"
import { setCode, setLanguage, setInputCode, setOutputCode, setFilename } from '../store/codeAreaSlice';
import Loginnav from './Loginnav';
import Nabvar from './Navbar';
import { use } from 'react';

export default function Problempage() {

  const { id, title } = useParams();
  const { isLogedin } = useSelector((state) => state.user)

  const [problem, setProblem] = useState({});
  const [tab, setTab] = useState("testcase");
  const [isError, setIsError] = useState(false);
  const [constraints, setConstraints] = useState([])
  const [tags, setTags] = useState([])
  const [testcases,setTestcases] = useState([]);
  const [inputs,setInputs] = useState([])
  const [result,setresult] = useState()

  const cases = [{ input: "1 2 3", output: "5" }]
  // const result = { verdict: "Accepted", total_testcases: 5, passed: 3, failedtestcase: 3, input: "1 2 3", output: "4", expectedoutput: "10" }

  // useEffect(()=>{

  // ])

  useEffect(() => {
    async function fetchdata() {
      const backend_url = import.meta.env.VITE_BACKEND_URL
      const response = await axios.post(backend_url + `/problems/getproblembyid/${id}`);
      const testcase = await axios.post(backend_url + `/problems/fetchtestcase`,{
        id
      })
      setTestcases(testcase.data)
      setProblem(response.data)
      setConstraints(response.data.constraints.split(","))
      setTags(response.data.tags.split(","))
      setInputs(response.data.input.split(","))
    }
    fetchdata();
  }, [id]);

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer); // cleanup
    }
  }, [showAlert]);


  const dispatch = useDispatch();

  const { filename, code, language, inputcode, outputcode } = useSelector((state) => state.codeArea);

  const codeinputs =
  {
    "cpp": {
      filename: "Main.cpp",
      code: `// Online C++ compiler to run C++ program online
#include <iostream> 
using namespace std;

int main() { 
    cout << "Welcome to Online Judges - online compiler -- C++!!!" << endl; 
                
    return 0; 
}`},
    "java": {
      filename: "Main.java",
      code: `// Online Java compiler to run Java program online
public class Main{
    public static void main(String[] args) {
        System.out.println("Welcome to Online Judges - online compiler -- Java!!!");
    }
}`
    },
    "py": {
      filename: "Main.py",
      code: `# Online python compiler to run Python program online
print("Welcome to Online Judges - online compiler -- Python!!!")`
    }
  }


  const handleCode = (e) => {
    dispatch(setCode(e.target.value))
  }
  const handleLang = (e) => {

    const selectedLang = e.target.value;

    dispatch(setLanguage(selectedLang));
    dispatch(setCode(codeinputs[selectedLang].code));
    dispatch(setFilename(codeinputs[selectedLang].filename));
  }
  const handleInputCode = (e) => {
    dispatch(setInputCode(e.target.value))
  }
  const handleOutputCode = (e) => {
    dispatch(setOutputCode(e.target.value))
  }

  const handleRun = async () => {
    try {
      const backend_url = import.meta.env.VITE_BACKEND_URL
      const response = await axios.post(backend_url + "/compiler/run_testcases", {
        language, code, testcases
      })

      console.log(response.data);
      dispatch(setOutputCode(response.data))
      setTab("output"); 
      setIsError(false);
      setTab("verdict")
      setresult(response.data)
    } catch (err) {
      console.log(err)
      dispatch(setOutputCode(err.response.data))
      setTab("output"); 
      setIsError(true);
    }
  }

  const handleAiReview = () => {

    if (isLogedin) {
      navigate("/ai-review", { state: { code } });
    } else {
      // setShowAlert(false);
      setShowAlert(true); // show the alert at top of page
    }
  }
  const handlesubmit = () => {
    if (isLogedin) {
      // navigate("/ai-review", { state: { code } });
    } else {
      // setShowAlert(false);
      setShowAlert(true); // show the alert at top of page
    }
  }



  const handleEditorWillMount = (monaco) => {
    monaco.editor.defineTheme("myTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#020617",
        "editor.lineHighlightBackground": "#1e293b",
        "editorCursor.foreground": "#38bdf8",
        "editor.selectionBackground": "#334155",

        // Monaco scrollbars
        "scrollbarSlider.background": "#2563EB",
        "scrollbar.shadow": "#00000000",
        "scrollbarSlider.border": "#0F172A",        // border color for radius effect
        "scrollbarSlider.borderRadius": "20px",
      }
    });
  };


  return (

    <>
      {isLogedin ? <Loginnav /> : <Nabvar />}


      <div className='problempage'>
        <div className="problemarea">

          <div className="body">
            <div className="problemheader">
              <label htmlFor="" >{problem.title || "Dummy"}</label>
              <label htmlFor="" className={`difficulty ${problem.difficulty?.toLowerCase()}`}>{problem.difficulty || "Easy"}</label>
            </div>
            <div className="fields">
              {/* <label htmlFor="" className='heading'>Problem Statement</label> */}
              <label htmlFor="">{problem.statement}</label>
            </div>
            <div className="fields">
              <label htmlFor="" className='heading'>Input</label>
               {inputs.map((input, index) => (
                  <div key={index} className='constraints'>{input}</div>
                ))}
            </div>
            <div className="fields">
              <label htmlFor="" className='heading'>Output</label>
              <label htmlFor="">{problem.output}</label>
            </div>
            <div className="fields">
              <label htmlFor="" className='heading'>Constraints</label>
            
                {constraints.map((constraint, index) => (
                  <div key={index} className='constraints'>{constraint}</div>
                ))}
              
            </div>
            <div className="fields">
              <label htmlFor="" className='heading'>Tags</label>
                {tags.map((tag, index) => (
                  <div key={index} className='tags'>{tag}</div>
                ))}
            </div>


          </div>
        </div>

        <div className="right">
          <div className='TextArea'>
            <div className='controlTab'>
              <div className="filename">{filename}</div>
              <div className="controls-right">
                <select name="" id="" className='select' value={language} onChange={handleLang}>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                  <option value="py">Python</option>
                </select>
                <button className='btn' onClick={handleRun}> Run</button>
                <button className='btn' onClick={handlesubmit}> Submit</button>
                <button className='btn' onClick={handleAiReview}> AI Review</button>
                {showAlert && <AuthAlert />}
              </div>
            </div>
            <div className="code_Area">
              <Editor
                className='codeArea'
                // height="100%"
                theme="myTheme"
                beforeMount={handleEditorWillMount}
                language={language === "py" ? "python" : language}
                value={code}
                onChange={(value) => dispatch(setCode(value))}
                options={{
                  automaticLayout: true,
                  scrollbar: {
                    vertical: "visible",      // show scrollbars
                    horizontal: "auto",
                    verticalScrollbarSize: 4, // thin
                    horizontalScrollbarSize: 4,
                    useShadows: false
                  },
                  overviewRulerLanes: 0,
                  fontSize: 14,
                  minimap: { enabled: false },
                  tabSize: 4,
                  insertSpaces: true
                }}
              />
            </div>
          </div>
          <div className="panel">
            <div className="panelHeader">
              <div onClick={() => setTab("output")}>Output</div>
              <div onClick={() => setTab("testcase")}> Testcase</div>
              <div onClick={() => setTab("verdict")}>Verdict</div>
            </div>
            <div className="panelArea">

              {/* {outputcode && setTab("output")} */}
              {/* {console.log(testcases)} */}
              {tab === "testcase" && (testcases ? <Testcase cases={testcases} /> :"No test cases" )}
              {tab === "verdict" && (<Verdict result={result} />)}
              {tab === "output" && (
                <textarea
                  className={`panelArea ${isError ? "errorOutput" : ""}`}
                  readOnly
                  value={outputcode}
                  onChange={handleOutputCode}
                />
              )}
            </div>

          </div>
        </div>

      </div>
    </>
  )
}
