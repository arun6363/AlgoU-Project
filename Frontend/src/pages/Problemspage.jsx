import React from 'react'
import ProblemTile from '../components/ProblemTile'
import "../styles/problemspage.css"
import Loginnav from '../components/Loginnav'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"
import { useSelector } from 'react-redux'
import Nabvar from '../components/Navbar'

export default function Problemspage() {

    const backend_url = import.meta.env.VITE_BACKEND_URL
    const [problems, setProblems] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const problemsPerPage = 10;

    const {isLogedin} = useSelector((state) => state.user);

    useEffect(() => {
        async function fetchdata() {
            const response = await axios.get(backend_url + "/problems/fetchproblems");
            setProblems(response.data)
        }
        fetchdata();
    }, [])

// pagination
    const currentProblems = React.useMemo(() => {
        const indexOfLast = currentPage * problemsPerPage;
        const indexOfFirst = indexOfLast - problemsPerPage;
        return problems.slice(indexOfFirst, indexOfLast);
    }, [problems, currentPage]);
    const totalPages = Math.ceil(problems.length / problemsPerPage);

    // setCurrentPage(currentProblems);
    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
        //  setCurrentPage(currentProblems);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
        //  setCurrentPage(currentProblems);
    };

    return (
        <>

            { isLogedin ? 
            <Loginnav /> : <Nabvar/>}
            <div className="problemspage">
                <div className='problems'>

                     <div className='heading_problem'>Problems</div>
                    
                    {problems.length > 0 ?
                        (problems.map(problem => (
                        <ProblemTile key={problem.id} id = {problem.id} title={problem.title} difficulty={problem.difficulty || "Easy"} />
                    )))
                    :
                    <div className="no-problems">No problems found</div>
                }
                </div>

                <div className="filters">

                    <div className='filter-card'>

                         <div className='heading'>Search</div>
                         <input type="text" placeholder='search problem' />
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
