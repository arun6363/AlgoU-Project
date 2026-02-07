import React from 'react'
import { useNavigate,useLocation} from "react-router-dom";
import { useDispatch } from 'react-redux';
import "../styles/Loginnav.css"
import { setLogin ,logout} from '../store/userSlice';

export default function Loginnav() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const username = localStorage.getItem("username")
    
    const isActive = (path) => location.pathname === path;

  return (
    <div className='loginnav'>
        <div className='heading' onClick={()=>{navigate("/")}}> Online Judge</div>
         <div className="middle">
            <div className={`mid ${isActive("/online-compiler") ? "active" : ""}`}
            onClick={()=>{navigate("/compiler")}}>Compiler</div>
            <div className={`mid ${isActive("/problems") ? "active" : ""}`} 
            onClick={()=>{navigate("/problems")}}>Problems</div>
        </div>
        <div className="right">
            <div className="username" onClick={()=>{navigate('/userprofile')}}>{username}</div>  
            <div className="username"  onClick={()=>{ dispatch(logout()), navigate('/')}}>Logout</div>
        </div>
    </div>
  )
}
