import React, { useEffect } from 'react'
import "../styles/UserProfile_2.css"
import Loginnav from './Loginnav.jsx'
import SolvedproblemTile from './SolvedproblemTile.jsx'
import CreatedproblemTile from './CreatedproblemTile.jsx'

import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'
import { logout } from '../store/userSlice.js'
import { useSearchParams } from "react-router-dom";

export default function UserProfile_2() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const backend_url = import.meta.env.VITE_BACKEND_URL
    const [createdproblems, setCreatedproblems] = useState([])
    const [solvedproblems, setSolvedproblems] = useState([])
    const [model, setModal] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const tabFromUrl = searchParams.get("tab");
    // setModal(tabFromUrl);

    useEffect(() => {
        async function fetchdata() {
            const username = localStorage.getItem("username")
            const response = await axios.post(backend_url + "/problems/fetchdata", {
                username
            })
            setSearchParams({ tab: "createdProblems" });
            console.log(response)
            localStorage.setItem('total_problems', response.data.total_problems);
        }
        if (!localStorage.getItem("total_problems")) fetchdata();
        fetchCreatedProblems();
    }, [])

    // useEffect(() => {
    //     if(tabFromUrl === "createdProblems"){
    //         if(!createdproblems) fetchCreatedProblems();
    //         // fetchCreatedProblems();
    //     }
    // }, [tabFromUrl]);


    async function fetchCreatedProblems() {
        const username = localStorage.getItem("username")
        // console.log(username)
        setSearchParams({ tab: "createdProblems" });
        setModal("createdProblems")
        // console.log(username, "Created Problems")
        const response = await axios.get(backend_url + `/problems/getcreatedproblems?username=${username}`, {
            username: username
        });
        // console.log(response.data)
        setCreatedproblems(response.data)
        // console.log(createdproblems) 
    }

    async function fetchSolvedProblems() {
        const username = localStorage.getItem("username")
        setSearchParams({ tab: "solvedProblems" });
        setModal("solvedProblems")
        console.log(username, "Solved Problems")
        const response = await axios.get(backend_url + `/problems/getcreatedproblems?username=${username}`, {
            username: username
        });
        console.log(response.data)
        setSolvedproblems(response.data)
    }

    async function fetchSubmissions() {
        // const username = localStorage.getItem("username")
        setSearchParams({ tab: "Submissions" });
        setModal("Submissions")
        // console.log(username,"Solved Problems")
        // const response = await axios.get(`http://localhost:3000/problems/getcreatedproblems?username=${username}`, {
        //     username: username
        // });
        // console.log(response.data)
        // setSolvedproblems(response.data)
    }

    const handlelogout = () => {
        localStorage.clear()
        dispatch(logout())
        navigate('/')
    }
    const handledelete = async () => {
        const username = localStorage.getItem("username")
        console.log(username)
        const response = await axios.post(backend_url + "/problems/deleteaccount", {
            username
        })
        localStorage.clear()
        dispatch(logout())
        navigate('/')
    }

    return (
        <div className='userprofile_2'>
            <Loginnav />
            <div className='main'>
                <div className="left">
                    <div className="header">
                        {/* <button onClick={() => fetchSubmissions()}>Submissions</button> */}
                        {/* <button onClick={() => fetchSolvedProblems()}>Solved Problems</button> */}
                        <button onClick={() => fetchCreatedProblems()}>Created Problems</button>
                        <button onClick={() => navigate("/createproblem")}>Create problem</button>
                    </div>
                    <div className="body">

                        {model === "Submissions" ? (<div>No Submissions yet</div>) :
                            (null)
                        }


                        {model === "createdProblems" ?
                            (
                                createdproblems.length > 0 ? (
                                    createdproblems.map((problem, index) => (
                                        <CreatedproblemTile key={index} id={problem.id} title={problem.title}
                                            onDeleteSuccess={fetchCreatedProblems}
                                        />
                                    ))
                                ) : (<div> No Created Poblems</div>)
                            ) : (null)
                        }
                        {/* {model === "solvedProblems" ?
                            (
                                solvedproblems.length > 0 ? (
                                    solvedproblems.map((problem, index) => (
                                        <SolvedproblemTile key={index} id={problem.id} title={problem.title} />
                                    ))
                                ) : (<div> No Solved Poblems</div>)
                            )
                            : (null)
                        } */}
                        {/* <SolvedproblemTile title={"Dummy"} difficulty={"Easy"} />
                        <SolvedproblemTile title={"Dummy"} difficulty={"Easy"} />
                        <SolvedproblemTile title={"Dumm-2"} difficulty={"Hard"} />
                        <CreatedproblemTile title={"created problem"} /> */}
                    </div>
                </div>
                <div className="right">
                    <div className="userdata">
                        <div className="user_heading">User Profile</div>
                        <div className="fields">
                            <div className="field_heading">Username</div>
                            <div className="field_value">{localStorage.getItem("username")}</div>
                        </div>
                        <div className="fields">
                            <div className="field_heading">Email</div>
                            <div className="field_value">{localStorage.getItem("email")}</div>
                        </div>
                        <div className="fields">
                            <div className="field_heading">Total Problems</div>
                            <div className="field_value">{localStorage.getItem("total_problems")}</div>
                        </div>
                        {/* <div className="fields">
                            <div className="field_heading">Solved Problems</div>
                            <div className="field_value">{localStorage.getItem("solved_problems")}</div>
                        </div> */}
                        {/* <div className="fields">
                            <div className="field_heading">Created Problems</div>
                            <div className="field_value">{localStorage.getItem("created_problems")}</div>
                        </div> */}
                        <div className="buttons">
                            <button className="btn" onClick={() => { navigate("/updatepassword") }}>Update Password</button>
                            <button className="btn" onClick={handlelogout} >Logout</button>
                            <button className="btn" onClick={handledelete}>Delete Account</button>
                            {/* <div className="btn">Update password</div>
                            <div className="btn" onClick={handlelogout}>Logout</div>
                            <div className="btn">Delete Account</div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
