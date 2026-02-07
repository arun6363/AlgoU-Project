import React from 'react'
import "../styles/UserProfile_2.css"
import Loginnav from './Loginnav'
import SolvedproblemTile from './SolvedproblemTile.jsx'
import CreatedproblemTile from './CreatedproblemTile.jsx'

import { useNavigate } from 'react-router'
import { useState } from 'react'
import axios from 'axios'

export default function UserProfile_2() {
    const navigate = useNavigate();

    const [createdproblems,setCreatedproblems] = useState([])

    async function fetchCreatedProblems(){
        const username = localStorage.getItem("username")
        console.log(username)
        const response = await axios.get(`http://localhost:3000/problems/getcreatedproblems?username=${username}`,{
            username:username
        });
        setCreatedproblems(response.data)
        console.log(createdproblems)
    }
    // fetchCreatedProblems;

    return (
        <div className='userprofile_2'>
            <Loginnav />
            <div className='main'>
                <div className="left">
                    <div className="header">
                        <button>Submissions</button>
                        <button>Solved Problems</button>
                        <button onClick={()=>fetchCreatedProblems()}>Created Problems</button>
                        <button onClick={()=>navigate("/createproblem")}>Create problem</button>
                    </div>
                    <div className="body">
                            <SolvedproblemTile title={"Dummy"} difficulty={"Easy"}/> 
                            <SolvedproblemTile title={"Dumm-2"} difficulty={"Hard"}/> 
                            <CreatedproblemTile title={"created problem"}/>
                            <SolvedproblemTile title={"Dummy"} difficulty={"Easy"}/> 
                            <SolvedproblemTile title={"Dumm-2"} difficulty={"Hard"}/> 
                            <CreatedproblemTile title={"created problem"}/>
                            <SolvedproblemTile title={"Dummy"} difficulty={"Easy"}/> 
                            <SolvedproblemTile title={"Dumm-2"} difficulty={"Hard"}/> 
                            <CreatedproblemTile title={"created problem"}/>
                            <SolvedproblemTile title={"Dummy"} difficulty={"Easy"}/> 
                            <SolvedproblemTile title={"Dumm-2"} difficulty={"Hard"}/> 
                            <CreatedproblemTile title={"created problem"}/>

                    </div>
                </div>
                <div className="right">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div>10</div>
                    <div>11</div>
                    <div>12</div>
                    <div>13</div>
                    <div>14</div>
                    <div>15</div>
                </div>
            </div>
        </div>
    )
}
