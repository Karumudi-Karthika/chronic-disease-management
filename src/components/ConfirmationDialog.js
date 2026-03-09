// src/components/ConfirmationDialog.js
import React from "react";

export default function ConfirmationDialog({ message, onConfirm, onCancel }) {
  return (
    <div style={overlayStyle}>
      <div style={dialogStyle}>
        <p style={{ marginBottom: "20px" }}>{message}</p>
        <div style={{ textAlign: "right" }}>
          <button style={cancelButtonStyle} onClick={onCancel}>No</button>
          <button style={confirmButtonStyle} onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const dialogStyle = {
  backgroundColor: "#fff",
  padding: "20px 30px",
  borderRadius: "8px",
  minWidth: "300px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
};

const confirmButtonStyle = {
  padding: "8px 16px",
  backgroundColor: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginLeft: "10px",
};

const cancelButtonStyle = {
  padding: "8px 16px",
  backgroundColor: "#aaa",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};