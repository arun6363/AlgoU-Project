import React from "react";
import "../styles/body.css";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Body() {

    const navigate = useNavigate();

    return (
        <>
            <header>
                <h1>Online Judge Platform</h1>
                <p>
                    Code, compile, and conquer. Practice programming problems,
                    submit solutions, and receive instant automated feedback.
                </p>

                <div className="header-buttons">
                    <button onClick={() => navigate("/login")} className="btn">
                        Start Coding
                    </button>

                    <button onClick={() => navigate("/register")} className="btn">
                        Explore Now
                    </button>
                </div>
            </header>

            {/* ABOUT */}
            <section>
                <h2 className="section-title">About the Platform</h2>
                <p style={{
                    textAlign: "center",
                    maxWidth: "800px",
                    margin: "auto",
                    color: "var(--text-muted)",
                }}>
                    A modern online judge system where developers solve coding problems
                    and receive real-time verdicts after automated test case evaluation.
                    Designed for students, competitive programmers, and interview preparation.
                </p>
            </section>

            {/* FEATURES */}
            <section>
                <h2 className="section-title">Key Features</h2>
                <div className="cards">
                    <div className="card">
                        <h3>Multi-Language Support</h3>
                        <p>Write and submit solutions in multiple programming languages.</p>
                    </div>
                    <div className="card">
                        <h3>Automated Evaluation</h3>
                        <p>Instant compilation and execution against hidden test cases.</p>
                    </div>
                    <div className="card">
                        <h3>Accurate Verdicts</h3>
                        <p>Accepted, Wrong Answer, TLE, Runtime Error, and more.</p>
                    </div>
                    <div className="card">
                        <h3>Secure Execution</h3>
                        <p>All code runs in isolated sandbox environments.</p>
                    </div>
                    <div className="card">
                        <h3>Submission History</h3>
                        <p>Track attempts, progress, and performance metrics.</p>
                    </div>
                    <div className="card">
                        <h3>Admin Control</h3>
                        <p>Manage problems, test cases, and users efficiently.</p>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section>
                <h2 className="section-title">How It Works</h2>
                <div className="steps">
                    <div className="step">
                        <span>1</span>
                        <h3>Select Problem</h3>
                        <p>Choose a challenge based on difficulty or topic.</p>
                    </div>
                    <div className="step">
                        <span>2</span>
                        <h3>Write Code</h3>
                        <p>Use the editor to implement your solution.</p>
                    </div>
                    <div className="step">
                        <span>3</span>
                        <h3>Submit</h3>
                        <p>Compile and execute your code securely.</p>
                    </div>
                    <div className="step">
                        <span>4</span>
                        <h3>Get Verdict</h3>
                        <p>Receive instant feedback and improve.</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta">
                <h2>Start Coding Today</h2>
                <p>Practice smarter. Improve faster. Code with confidence.</p>
                <br />
                <button className="btn dark" onClick={() => navigate("/register")} >Create Account</button>
            </section>

            {/* FOOTER */}
            <footer>
                © 2026 Online Judge Platform. All rights reserved.
            </footer>
        </>
    );
}
