import React from 'react'
import { useNavigate, useSearchParams } from 'react-router';
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';


export default function AIreviewpage() {

  const backend_url = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate();
  const location = useLocation();

    const { state } = location;
    const [review,setReview] = useState("")

    useEffect(()=>{
     async function fetchreview(){
        const response = await axios.post(backend_url + "/ai-review",{
          code:state.code,
        })

        console.log(response)
        setReview(response.data.review);
     }
     if(!review) fetchreview();

    },[])

   return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <button style={styles.closeBtn} onClick={()=>navigate(-1)}>
          ✕
        </button>

        <h2 style={styles.title}>AI Review</h2>

        <div style={styles.response}>
          <ReactMarkdown>
            {review ? review : "Waiting for AI response..."}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}






const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },
  card: {
    width: "50vw",
    maxHeight: "80vh",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "24px",
    position: "relative",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column"
  },
  closeBtn: {
    position: "absolute",
    top: "12px",
    right: "12px",
    border: "none",
    background: "transparent",
    fontSize: "20px",
    cursor: "pointer"
  },
  title: {
    marginBottom: "16px",
    color:"black",
  },
  response: {
    overflowY: "auto",
    lineHeight: "1.6",
    color: "#333"
  }
};

// export default AIReviewOverlay;
