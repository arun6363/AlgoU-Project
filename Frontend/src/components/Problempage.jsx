import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";


import "../styles/problempage.css"
import { useState } from 'react';
import axios from 'axios';

import { useDispatch, useSelector } from "react-redux"
import { setCode, setLanguage, setInputCode, setOutputCode, setFilename } from '../store/codeAreaSlice';

export default function Problempage() {

  const { id, title } = useParams();
  const [problem, setProblem] = useState({});

  // console.log(id,title);

  useEffect(() => {
    console.log(problem)
    async function fetchdata() {
      const backend_url = import.meta.env.VITE_BACKEND_URL
      const response = await axios.post(backend_url+`/problems/getproblembyid/${id}`);
      console.log(response.data);
      setProblem(response.data)
    }
    fetchdata();

  }, [id]);


  const dispatch = useDispatch();


  const { isLogedin } = useSelector((state) => state.user);

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
      const response = await axios.post(backend_url+"/compiler/run", {
        language, code, input: inputcode
      })

      dispatch(setOutputCode(response.data.output))
    } catch (err) {
      dispatch(setOutputCode(err.response.data.std.stderr))
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
    <div className='problempage'>
      <div className="problemarea">

        <div className="body">
          <div className="problemheader">
            <label htmlFor="" >{problem.title}</label>
            <label htmlFor="">{problem.difficulty || "Easy"}</label>
          </div>
          <div className="fields">
            <label htmlFor="" className='heading'>Problem Statement</label>
            <label htmlFor="">{problem.statement}</label>
          </div>
          <div className="fields">
            <label htmlFor="" className='heading'>Input</label>
            <label htmlFor="">{problem.input}</label>
          </div>
          <div className="fields">
            <label htmlFor="" className='heading'>Output</label>
            <label htmlFor="">{problem.output}</label>
          </div>
          <div className="fields">
            <label htmlFor="" className='heading'>Constraints</label>
            <label htmlFor="">{problem.constraints}</label>
          </div>
          <div className="fields">
            <label htmlFor="" className='heading'>Tags</label>
            <label htmlFor="">{problem.tags}</label>
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
          <div className="panelHeader">Output</div>
          <textarea className="panelArea" readOnly value={outputcode} onChange={handleOutputCode} />
        </div>
      </div>

    </div>
  )
}
