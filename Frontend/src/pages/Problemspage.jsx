import React from 'react'
import ProblemTile from '../components/ProblemTile'
import "../styles/problemspage.css"
import Loginnav from '../components/Loginnav'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"

export default function Problemspage() {

    const [problems, setProblems] = useState([])

    useEffect(() => {
        async function fetchdata() {
            const response = await axios.post("http://localhost:3000/problems/fetchproblems");
            // console.log(response);
            setProblems(response.data)
        }
        fetchdata();
    }, [])

    return (
        <>
            <Loginnav />
            <div className="problemspage">
                <div className='problems'>

                    {problems.map(problem => (
                        <ProblemTile key={problem.id} title={problem.title} difficulty={problem.difficulty || "Easy"} />
                    ))}

                    {/* <ProblemTile title={"Two Sum"} difficulty={"Easy"} />
                    <ProblemTile title={"Longest palindromic Subsequence"} difficulty={"Medium"} />
                    <ProblemTile title={"Next Greater Element"} difficulty={"Hard"} />
                    <ProblemTile title={"Search in rotated sorted array"} difficulty={"Hard"} />
                    <ProblemTile title={"Max Consecutive Ones's"} difficulty={"Hard"} />*/}

                </div>
                <div className="filters">

                    <div className='filter-card'>

                        <div className="heading">
                            {/* <input type="text" placeholder='Search Problem here'  /> */}
                        </div>
                    </div>
                    <div className="filter-card">
                        <div className='heading'>Type</div>
                        <div className="card-items">
                            <span>Solved</span>
                            <span>UnSolved</span>
                        </div>
                    </div>
                    <div className='filter-card'>
                        <div className='heading'>Difficulty</div>
                        <div className="card-items">
                            <span>Easy</span>
                            <span>Meduim</span>
                            <span>Hard</span>
                        </div>
                    </div>
                    <div className='filter-card'>
                        <div className='heading'>Topics</div>
                        <div className="card-items">
                            <span>Arrays</span><span>Strings</span><span>Trees</span>
                            <span>Graphs</span><span>Stacks</span><span>Queues</span>
                            <span>Linked List</span><span>Dynaic Programming</span><span>Recursion</span>
                            <span>Binary Trees</span><span>Binary Search Trees</span><span>Binary Search</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
