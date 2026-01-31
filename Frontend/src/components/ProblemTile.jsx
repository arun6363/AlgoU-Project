import React from 'react'
import "../styles/problemtile.css"
import {useNavigate} from "react-router-dom"

export default function ProblemTile(props) {

  const navigate = useNavigate();

  return (
    <div className='problemtile'>
        <div className="left">
            <div className="title">{props.title}</div>
        </div>

        <div className="right">
             <div className={`difficulty ${props.difficulty?.toLowerCase()}`}>
            {props.difficulty}</div>
            <button className='btn' onClick={()=>{navigate(`/problems/${props.title}`) }}>Solve</button>
        </div>
    </div>
  )
}
