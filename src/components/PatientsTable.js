// src/components/PatientsTable.js
import React from "react";
import { useNavigate } from "react-router-dom";

function PatientsTable({ patients, searchTerm = "", onDelete }) {
  const navigate = useNavigate();

  const highlight = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.toString().replace(regex, "<mark>$1</mark>");
  };

  return (
    <div style={{ maxHeight: "70vh", overflowY: "auto", border: "1px solid #ddd", borderRadius: "5px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
        <thead style={{ backgroundColor: "#f7f7f7" }}>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Gender</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p, idx) => (
            <tr key={p.id} style={idx % 2 === 0 ? { backgroundColor: "#fafafa" } : {}}>
              <td dangerouslySetInnerHTML={{ __html: highlight(p.id) }} style={tdStyle} />
              <td dangerouslySetInnerHTML={{ __html: highlight(p.fullName) }} style={tdStyle} />
              <td dangerouslySetInnerHTML={{ __html: highlight(p.gender) }} style={tdStyle} />
              <td dangerouslySetInnerHTML={{ __html: highlight(p.email) }} style={tdStyle} />
              <td dangerouslySetInnerHTML={{ __html: highlight(p.phone) }} style={tdStyle} />
              <td style={tdStyle}>
                <button onClick={() => navigate(`/edit/${p.id}`)} style={buttonStyle}>Edit</button>{" "}
                <button onClick={() => onDelete(p.id)} style={{ ...buttonStyle, backgroundColor: "#e53935", color: "white" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = { padding: "10px", textAlign: "left", borderBottom: "1px solid #ddd" };
const tdStyle = { padding: "10px", borderBottom: "1px solid #eee" };
const buttonStyle = { padding: "5px 10px", margin: "0 5px", border: "none", borderRadius: "3px", backgroundColor: "#1976d2", color: "white", cursor: "pointer" };

export default PatientsTable;