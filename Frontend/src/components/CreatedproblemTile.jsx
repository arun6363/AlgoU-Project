import React from 'react'
import "../styles/Createdproblemtile.css"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import slugify from "slugify"

export default function CreatedproblemTile(props) {

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
    <div className='createdproblemtile'>
        <div className="title">
            <div >{props.title}</div>
        </div>
         <div className="buttons">
            <button className='btn'> Edit </button>
            <button className='btn' onClick={handleSolve}>Delete</button>
        </div>

    </div>
  )
}
