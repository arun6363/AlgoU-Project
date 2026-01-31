import React from 'react'
import "../styles/navbar.css"

import { useNavigate } from 'react-router-dom'

export default function Nabvar(props) {

  const navigate = useNavigate();

  const handlelogin = ()=>{
    navigate("/login")
  }
  const handleregister = ()=>{
    navigate("/register")
  }

  return (
    <div className='navbar'>
      <div className="heading" onClick={()=>navigate('/')} >{props.name}</div>

      <div className="auth-buttons">
        <button onClick={handlelogin} >Login</button>
        <button onClick={handleregister} >Register</button>
      </div>
    </div>
  )
}
