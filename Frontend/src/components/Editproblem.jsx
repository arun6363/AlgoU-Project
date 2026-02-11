import React, { useEffect } from 'react'
import axios from "axios"

import "../styles/createproblem.css"
import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setId, setTags, setTitle, setTimelimit, setInput, setOutput, setConstraints, setStatement, setDifficulty, resetproblem } from '../store/problemSlice'

export default function Editproblem(props) {

    const [errors, setErrors] = useState({});
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [problem, setProblem] = useState({})
    const pid = props.id;

    useEffect(() => {
        async function fetchdata() {
            const backend_url = import.meta.env.VITE_BACKEND_URL
            const response = await axios.post(backend_url + `/problems/getproblembyid/${pid}`);
            // console.log(response.data);
            const data = response.data;
            setProblem(response.data)

            dispatch(setId(data.id));
            dispatch(setTimelimit(data.timelimit));
            dispatch(setTags(data.tags));
            dispatch(setStatement(data.statement));
            dispatch(setTitle(data.title));
            dispatch(setInput(data.input))
            dispatch(setOutput(data.output));
            dispatch(setConstraints(data.constraints));
            dispatch(setDifficulty(data.difficulty));
        }
        if (pid) fetchdata();
    }, [pid, dispatch])

    const { id, title, statement, timelimit, input, output, constraints, tags, difficulty } = useSelector((state) => state.problem)

    const handleId = (e) => {
        dispatch(setId(e.target.value));
        setErrors({})
    }
    const handleTitle = (e) => {
        dispatch(setTitle(e.target.value));
        setErrors({})
    }
    const handleStatement = (e) => {
        dispatch(setStatement(e.target.value));
        setErrors({})
    }
    const handleDifficulty = (e) => {
        dispatch(setDifficulty(e.target.value));
        setErrors({})
    }
    const handleTimelimit = (e) => {
        dispatch(setTimelimit(e.target.value));
        setErrors({})
    }
    const handleInput = (e) => {
        dispatch(setInput(e.target.value));
        setErrors({})
    }
    const handleOutput = (e) => {
        dispatch(setOutput(e.target.value));
        setErrors({})
    }
    const handleConstraints = (e) => {
        dispatch(setConstraints(e.target.value));
        setErrors({})
    }
    const handleTags = (e) => {
        dispatch(setTags(e.target.value));
        setErrors({})
    }
    const mapErrors = (errors) => {
        const formaterr = {}
        errors.forEach((err) => {
            formaterr[err.path] = err.msg
        })
        return formaterr;
    }

    const handlesave = async () => {
        try {
            const username = localStorage.getItem("username")
            const backend_url = import.meta.env.VITE_BACKEND_URL
            const response = await axios.patch(backend_url + "/problems/editproblem", {
                id, title, statement, difficulty, timelimit, input, output, constraints, tags, username
            })

            console.log(response.data);
            dispatch(resetproblem())
            console.log(id,title);
            navigate("/userprofile")
        } catch (err) {
            if (err?.response?.data?.errors) {
                const formattederrors = mapErrors(err.response.data.errors);
                setErrors(formattederrors)
                console.log(errors)
            }
            else if (err.response.data.msg) {
                console.log(err.response.data.msg)
                setErrors({ id: err.response.data.msg })
            }
        }
    }


    return (
        <div className='createproblem'>
            <div className="header">
                <span>Edit Problem</span>
                <span className='save' onClick={handlesave}>Save</span>
            </div>
            <div className="body">
                <div className="fields">
                    <label htmlFor="">Problem Id</label>
                    <input type="text" placeholder='Ex: 1' value={id} onChange={handleId} readOnly />
                    {errors.id && <p>{errors.id}</p>}
                </div>
                <div className="fields">
                    <label htmlFor="">Problem Title</label>
                    <input type="text" placeholder='Ex: Two Sum' value={title} onChange={handleTitle} />
                    {errors.title && <p>{errors.title}</p>}
                </div>
                <div className="fields">
                    <label htmlFor="">Problem Statement</label>
                    <textarea value={statement} onChange={handleStatement} />
                    {errors.statement && <p>{errors.statement}</p>}
                </div>
                <div className="fields">
                    <label htmlFor="">Problem Difficulty</label>
                    <select name="" id="" value={difficulty} onChange={handleDifficulty}>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                    {errors.difficulty && <p>{errors.difficulty}</p>}
                </div>
                <div className="fields">
                    <label htmlFor="">Time Limit(max:4secs)</label>
                    <input type="text" placeholder='Enter Time limit for problem' value={timelimit} onChange={handleTimelimit} />
                    {errors.timelimit && <p>{errors.timelimit}</p>}
                </div>
                <div className="fields">
                    <label htmlFor="">Input</label>
                    <input type="text" placeholder='Enter input format' value={input} onChange={handleInput} />
                    {errors.input && <p>{errors.input}</p>}
                </div>
                <div className="fields">
                    <label htmlFor="">Output</label>
                    <input type="text" placeholder='Enter output format' value={output} onChange={handleOutput} />
                    {errors.output && <p>{errors.output}</p>}
                </div>
                <div className="fields">
                    <label htmlFor="">Constraints</label>
                    <input type="text" placeholder='Ex: 1<=N<=10^5' value={constraints} onChange={handleConstraints} />
                    {errors.constraints && <p>{errors.constraints}</p>}
                </div>
                <div className="fields">
                    <label htmlFor="">Tags</label>
                    <input type="text" placeholder='Ex: Array,DP' value={tags} onChange={handleTags} />
                    {errors.tags && <p>{errors.tags}</p>}
                </div>
            </div>
        </div>
    )
}
