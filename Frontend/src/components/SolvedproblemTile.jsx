import React from 'react'
import "../styles/solvedproblemtile.css"
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


    const title = slugify(props.title)
    navigate(`/problems/${props.id}/${title}`)
  }

  return (
    <div className='solvedproblemtile'>
        <div className="title">
            <div >{props.title}</div>
        </div>
         {/* <div className="right"> */}
            <button className='btn' onClick={handleSolve}>Solve</button>
        {/* </div> */}

    </div>
  )
}
