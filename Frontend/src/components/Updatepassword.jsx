import React from 'react'

import "../styles/modal.css"

import { useSelector, useDispatch } from "react-redux";
import { setConfirmPassword, setUsername, setNewPassword, resetAuth } from "../store/authSlice"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';


export default function Updatepassword() {

    const { confirmpassword, username, newpassword, } = useSelector((state) => state.auth);

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

    const handleupadte = async () => {
        try {
            const backend_url = import.meta.env.VITE_BACKEND_URL
            const response = await axios.patch(backend_url+"/auth/updatepassword",
                { username, newpassword, confirmpassword }
            )

            dispatch(resetAuth())
            navigate("/")
        } catch (err) {
            if (err?.response?.data?.errors) {
                const formattederrors = mapErrors(err.response.data.errors);
                setErrors(formattederrors)
            }
            else if (err.response.data.msg) {
                setErrors({ msg: err.response.data.msg })
            }
        }
    }


    return (
        <div className="modal-overlay" style={{ display: "flex" }}>
            <div className="modal">
                <button
                    className="close-btn"
                    onClick={() => { setErrors({}), navigate("/") }}
                >
                    &times;
                </button>

                <h2>Upadate Password</h2>
                <p>Update Password for Online Judge</p>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" placeholder="Enter username" value={username} onChange={(e) => { dispatch(setUsername(e.target.value)), setErrors({}) }} />
                    {errors.username && <p className='error'> {errors.username}</p>}
                </div>

                <div className="form-group">
                    <label>New Password</label>
                    <input type="password" placeholder="New Password" value={newpassword} onChange={(e) => { dispatch(setNewPassword(e.target.value)), setErrors({}) }} />
                    {errors.newpassword && <p className='error'> {errors.newpassword}</p>}
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmpassword}
                        onChange={(e) => { dispatch(setConfirmPassword(e.target.value)), setErrors({}) }}
                    />
                    {errors.confirmpassword && <p className='error'> {errors.confirmpassword}</p>}
                </div>

                {errors.msg && <p className='error_main'>{errors.msg}</p>}

                <button className="btn" onClick={handleupadte}>Upadate Password</button>

                <div className="footer-text">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="link"
                    >
                        Login
                    </span>
                </div>
            </div>
        </div>
    )
}
