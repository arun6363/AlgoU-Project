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

  const handledelete = async ()=>{
    // console.log(props.id);
    const id = props.id;
    const response = await axios.post("http://localhost:3000/problems/deleteproblem",{
      id
    })

    props.onDeleteSuccess();
  }

  const handleedit = async ()=>{
    // console.log(props.id,"navigating");
    navigate(`/editproblem/${props.id}`);
  }

  return (
    <div className='createdproblemtile'>
        <div className="title">
            <div >{props.title}</div>
        </div>
         <div className="buttons">
            <button className='btn' onClick={handleedit}> Edit </button>
            <button className='btn' onClick={handledelete}> Delete</button>
        </div>

    </div>
  )
}
