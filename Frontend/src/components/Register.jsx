import React from 'react'

import "../styles/modal.css"

import { useSelector, useDispatch } from "react-redux";
import { setEmail, setUsername, setPassword, resetAuth } from "../store/authSlice"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';

export default function Register() {

    const { password, email, username } = useSelector((state) => state.auth);

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

    const handleregister = async () => {


        try {
            const backend_url = import.meta.env.VITE_BACKEND_URL
            const response = await axios.post(backend_url+"/auth/register",
                { username, email, password }
            )
            dispatch(resetAuth());
            navigate("/")
        } catch (err) {

            if (err?.response?.data?.errors) {
                const formattederrors = mapErrors(err.response.data.errors);
                setErrors(formattederrors)
            }
            else if (err.response.data.msg) {
                setErrors({msg : err.response.data.msg})
            }
        }
    }
    
    return (
        <div className="modal-overlay" style={{ display: "flex" }}>
            <div className="modal">
                <button
                    className="close-btn"
                    onClick={() => {setErrors({}),navigate("/")}}
                >
                    &times;
                </button>

                <h2>Create Account</h2>
                <p>Join the Online Judge platform</p>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" placeholder="Choose a username" value={username} onChange={(e) =>{ dispatch(setUsername(e.target.value)),setErrors({})}} />
                    {errors.username && (<p className='error'>{errors.username}</p>)}
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Enter email" value={email} onChange={(e) => {dispatch(setEmail(e.target.value)),setErrors({})}} />
                    {errors.email && (<p className='error'>{errors.email}</p>)}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => {dispatch(setPassword(e.target.value)),setErrors({})}}
                    />
                    {errors.password && (<p className='error' >{errors.password}</p>)}
                </div>

                 {errors.msg && (<p className='error_main' >{errors.msg}</p>)}

                <button className="btn" onClick={handleregister}> Register</button>

                <div className="footer-text">
                    Already have an account?{" "}
                    <span
                        onClick={() => { dispatch(resetAuth()); navigate("/login") }}
                        className="link"
                    >
                        Login
                    </span>
                </div>
            </div>

        </div>
    )
}
