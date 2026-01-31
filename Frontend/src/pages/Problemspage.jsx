import React from 'react'
import ProblemTile from '../components/ProblemTile'
import "../styles/problemspage.css"
import Loginnav from '../components/Loginnav'

export default function Problemspage() {
  return (
    <>
    <Loginnav/>
    <div className="problemspage">
        <div className='problems'>
            <ProblemTile title={"Two Sum"} difficulty={"Easy"}/>
            <ProblemTile title={"Longest palindromic Subsequence"} difficulty={"Medium"}/>
            <ProblemTile title={"Next Greater Element"} difficulty={"Hard"}/>
            <ProblemTile title={"Search in rotated sorted array"} difficulty={"Hard"}/>
            <ProblemTile title={"Max Consecutive Ones's"} difficulty={"Hard"}/>
            <ProblemTile title={"Two Sum"} difficulty={"Easy"}/>
            <ProblemTile title={"Longest palindromic Subsequence"} difficulty={"Medium"}/>
            <ProblemTile title={"Next Greater Element"} difficulty={"Hard"}/>
            <ProblemTile title={"Search in rotated sorted array"} difficulty={"Hard"}/>
            <ProblemTile title={"Max Consecutive Ones's"} difficulty={"Easy"}/>
            <ProblemTile title={"Two Sum"} difficulty={"Easy"}/>
            <ProblemTile title={"Longest palindromic Subsequence"} difficulty={"Hard"}/>
            <ProblemTile title={"Next Greater Element"} difficulty={"Easy"}/>
            <ProblemTile title={"Search in rotated sorted array"} difficulty={"Hard"}/>
            <ProblemTile title={"Max Consecutive Ones's"} difficulty={"Medium"}/>
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
