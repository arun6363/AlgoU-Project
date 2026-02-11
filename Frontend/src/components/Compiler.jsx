import React from 'react'
import axios from "axios"
import Editor from "@monaco-editor/react";
import "../styles/compiler.css"
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { setCode, setLanguage, setInputCode, setOutputCode, setFilename } from '../store/codeAreaSlice';
// import { s} from '../store/codeAreaSlice';
import Loginnav from './Loginnav';
import Navbar from './Navbar';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import AuthAlert from './AuthAlert';

export default function Compiler() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const backend_url = import.meta.env.VITE_BACKEND_URL
    const [aireview, setaireview] = useState(false)
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
    if (showAlert) {
        const timer = setTimeout(() => setShowAlert(false), 3000);
        return () => clearTimeout(timer); // cleanup
    }
}, [showAlert]);

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
            // const response = await axios.post("http://localhost:3000/compiler/run", {
            //     language, code, input:inputcode 
            // })

            const response = await axios.post(backend_url + "/compiler/run", {
                language, code, input: inputcode
            })
            // console.log(response);
            // dispatch(setOutputCode(response.data.output))
            dispatch(setOutputCode(response.data))
        } catch (err) {
            // console.log(err.response);
            dispatch(setOutputCode(err.response.data.std.error))
            // dispatch(setOutputCode(err.response.data.std.stderr))
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

    const handlesubmit = ()=>{
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

        <div className="compage">
            <div className="main">

                {isLogedin ? <Loginnav /> : <Navbar name={"Online Compiler"} />}
                {/* <div className="navbar">
                <div className="heading"><a href="#">Online Compiler</a></div>
            </div> */}
                <div className='compiler'>
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
                    <div className='inputArea'>

                        <div className="panel">
                            <div className="panelHeader">Input</div>
                            <textarea className="panelArea" value={inputcode} onChange={handleInputCode} />
                        </div>

                        <div className="panel">
                            <div className="panelHeader">Output</div>
                            <textarea className="panelArea" readOnly value={outputcode} onChange={handleOutputCode} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
