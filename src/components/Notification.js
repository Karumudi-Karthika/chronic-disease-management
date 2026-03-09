// src/components/Notification.js
import React from "react";

export default function Notification({ message, type }) {
  if (!message) return null;

  return (
    <div style={{ ...containerStyle, backgroundColor: type === "error" ? "#d32f2f" : "#4caf50" }}>
      {message}
    </div>
  );
}

const containerStyle = {
  position: "fixed",
  top: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  padding: "12px 24px",
  color: "white",
  borderRadius: "6px",
  fontWeight: "bold",
  zIndex: 1000,
  minWidth: "250px",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
};