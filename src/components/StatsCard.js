// src/components/StatsCard.js
import React from "react";

export default function StatsCard({ total, avgAge }) {
  return (
    <div style={cardStyle}>
      <h3>Metrics</h3>
      <p>Total Patients: {total}</p>
      <p>Average Age: {avgAge}</p>
    </div>
  );
}

const cardStyle = {
  padding: "15px",
  border: "1px solid #1976d2",
  borderRadius: "6px",
  marginBottom: "20px",
  width: "250px",
  backgroundColor: "#f0f8ff",
};