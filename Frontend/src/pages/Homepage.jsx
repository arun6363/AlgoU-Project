import React from 'react'
import "../styles/homepage.css"
import Loginnav from '../components/Loginnav'
import { useNavigate } from 'react-router'

export default function Homapage() {

  const username = localStorage.getItem("username")
  const navigate = useNavigate()
  return (
    <div className='home'>

      <Loginnav />
      <div className="hero-container">
        <div className="hero-card">
          <h1>
            Welcome back{username && `, ${username}`} 👋
          </h1>

          <p className="subtitle">
            Welcome to <strong>Online Judge</strong> — solve problems,
            sharpen your skills, and track your progress.
          </p>

          <div className="hero-features">
            <span>🧠 Practice</span>
            <span>📈 Progress</span>
            <span>🏆 Compete</span>
            <span>🚀 Grow</span>
          </div>

          <button className="cta-btn" onClick={()=>navigate("/problems")}>
            Start Solving
          </button>
        </div>
      </div>


    </div>
  )
}
