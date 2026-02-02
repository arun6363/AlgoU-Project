import React from 'react'
import "../styles/problemtile.css"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import slugify from "slugify"

export default function ProblemTile(props) {


function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

  const navigate = useNavigate();

  const handleSolve = async ()=>{

    // const response = await axios.post(`http://localhost:3000/problems/getproblembyid/${props.id}`)

    const title = slugify(props.title)
    navigate(`/problems/${props.id}/${title}`)
    // console.log(response.data);
  }

  return (
    <div className='problemtile'>
        <div className="left">
            <div className="title">{props.title}</div>
        </div>

        <div className="right">
             <div className={`difficulty ${props.difficulty?.toLowerCase()}`}>
            {props.difficulty}</div>
            <button className='btn' onClick={handleSolve}>Solve</button>
        </div>
    </div>
  )
}
