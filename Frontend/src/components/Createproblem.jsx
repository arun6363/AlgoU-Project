import React from 'react'
import axios from "axios"

import "../styles/createproblem.css"
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate} from "react-router-dom"
import { setId, setTags, setTitle, setInput, setOutput, setConstraints, setStatement, setDifficulty,resetproblem} from '../store/problemSlice'

export default function Createproblem() {

  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const mapErrors = (errors) => {
    const formaterr = {}
    errors.forEach((err) => {
      formaterr[err.path] = err.msg
    })
    return formaterr;
  }

  const dispatch = useDispatch()
  const { id, title, statement, input, output, constraints, tags ,difficulty} = useSelector((state) => state.problem)

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

  const handlesave = async () => {
    try {
      const response = await axios.post("http://localhost:3000/problems/createproblem", {
        id, title, statement, difficulty,input, output, constraints, tags
      })

      console.log(response.data);
      dispatch(resetproblem())
      navigate("/userprofile")
    } catch (err) {
      if (err?.response?.data?.errors) {
        const formattederrors = mapErrors(err.response.data.errors);
        setErrors(formattederrors)
        console.log(errors)
      }
      else if (err.response.data.msg) {
        console.log(err.response.data.msg )
        setErrors({ id: err.response.data.msg })
      }
    }
  }

  return (
    <div className='createproblem'>
      <div className="header">
        <span>Create Problem</span>
        <span className='save' onClick={handlesave}>Save</span>
      </div>
      <div className="body">
        <div className="fields">
          <label htmlFor="">Problem Id</label>
          <input type="text" placeholder='Ex: P001' value={id} onChange={handleId} />
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
          <input type="text" placeholder='Ex: Easy' value={difficulty} onChange={handleDifficulty}/>
          {errors.difficulty && <p>{errors.difficulty}</p>}
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
