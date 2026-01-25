import React from 'react'

import "../styles/modal.css"

import { useSelector, useDispatch } from "react-redux";
import { setUsername, setPassword, resetAuth } from "../store/authSlice"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
export default function Login() {

    const {password,username} = useSelector((state)=>state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

     const [errors, setErrors] = useState({});
    
        const mapErrors = (errors) => {
            const formaterr = {}
            errors.forEach((err) => {
                formaterr[err.path] = err.msg
            })
            return formaterr;
        }

    const handlelogin = async ()=>{

        try{
            console.log(username,password);
            const response = await axios.post("http://localhost:3000/auth/login",
                {username,password}
            )
            console.log(response.data);
            dispatch(resetAuth());
            navigate("/")
        }catch(err){

            if (err?.response?.data?.errors) {
                const formattederrors = mapErrors(err.response.data.errors);
                // console.log(formattederrors)
                setErrors(formattederrors)
                // console.log(errors)
            }
            else if (err.response.data.msg) {
                // console.log(err.response.data.msg)
                setErrors({msg : err.response.data.msg})
            }
        }
        
    }




    return (

        <div className="modal-overlay" style={{ display: "flex" }} >
            <div className="modal">
                <button
                    className="close-btn"
                    onClick={()=>{setErrors({}),navigate("/")}}
                >
                    &times;
                </button>

                <h2>Login</h2>
                <p>Access your Online Judge account</p>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" placeholder="Enter username" value={username} onChange={(e) => {dispatch(setUsername(e.target.value)), setErrors({})}} />
                    {errors.username && <p className='error'> {errors.username}</p>}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" placeholder="Enter password" value={password} onChange={(e) => {dispatch(setPassword(e.target.value)), setErrors({})} } />
                    {errors.password && <p className='error'>{errors.password}</p>}
                </div>

                <button className="btn1" onClick={()=>navigate("/updatepassword")}>Forget Password?</button>

                 {errors.msg && <p className='error_main'>{errors.msg}</p>}

                <button className="btn" onClick={handlelogin}>Login</button>

                <div className="footer-text">
                    Don’t have an account?{" "}
                    <span
                        onClick={() =>{dispatch(resetAuth()), navigate("/register")}}
                        className="link"
                    >
                        Register
                    </span>
                </div>
            </div>
        </div>
    );
}
