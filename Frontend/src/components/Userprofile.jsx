import React from 'react'

import "../styles/userprofile.css"
import Loginnav from './Loginnav'
import { useNavigate } from 'react-router'

export default function Userprofile() {

  const navigate = useNavigate();
  return (
    <div className='profile'>
        <Loginnav/>
        <div className="main"> 
          <div className="left">
            <div className="top">
              <div className='child'>Solved Problems</div>
              <div className='child'>Submissions</div>
              <div className='child' onClick={()=>navigate("/createproblem")}>Create Problem</div>
            </div>
            <div className="body"></div>
          </div>
          <div className="right">
            <div className="userdata">
                <label htmlFor="">Username</label>
                <input type="text" readOnly value={"arun_011"} />
            </div>
            <div className="userdata">
                <label htmlFor="">Email</label>
                <input type="text" readOnly value={"arun@gmail.com"} />
            </div>
            <button>Update password</button>
            <button>Logout</button>
            <button>Delete Account</button>
          </div>
        </div>
    </div>
  )
}
