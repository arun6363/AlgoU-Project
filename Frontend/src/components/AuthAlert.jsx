import React, { useState, useEffect } from "react";

export default function AuthAlert({ message, duration = 3000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    // Cleanup timer if component unmounts
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div style={alertStyle}>
      <span>{message || "Create or login into your account to access this feature"}</span>
      <button style={buttonStyle} onClick={() => setVisible(false)}>
        &times;
      </button>
    </div>
  );
}

const alertStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "60px",
  backgroundColor: "var(--warning)", // using your CSS variable
  color: "black",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
//   margin:"10px",
  padding: "0 20px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  fontWeight: "500",
  fontSize: "16px",
  zIndex: 1000,
};

const buttonStyle = {
  background: "transparent",
  border: "none",
  fontSize: "18px",
  cursor: "pointer",
  color: "black",
};
