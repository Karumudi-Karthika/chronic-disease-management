// src/pages/Patients.js
import React, { useState } from "react";
import { deletePatient } from "../services/api";
import ConfirmationDialog from "../components/ConfirmationDialog";

function Patients({ patients, loading, refreshPatients, onEdit, showNotification }) {
  const [deletingId, setDeletingId] = useState(null);
  const [dialog, setDialog] = useState({ show: false, patientId: null });

  // Delete handlers
  const handleDeleteClick = (id) => setDialog({ show: true, patientId: id });
  const handleCancelDelete = () => setDialog({ show: false, patientId: null });

  const handleConfirmDelete = async () => {
    const id = dialog.patientId;
    setDialog({ show: false, patientId: null });
    setDeletingId(id);

    try {
      await deletePatient(id);
      showNotification("Patient deleted successfully!");
      refreshPatients();
    } catch (err) {
      console.error("Failed to delete patient:", err);
      showNotification("Failed to delete patient", "error");
    }
    setDeletingId(null);
  };

  // Format DOB as DD/MM/YYYY
  const formatDOB = (dob) => {
    if (!dob) return "";
    const date = new Date(dob);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Calculate average age
  const calculateAvgAge = () => {
    if (!patients.length) return 0;
    const now = new Date();
    const totalAge = patients.reduce((sum, p) => {
      if (!p.dateOfBirth) return sum;
      const dob = new Date(p.dateOfBirth);
      let age = now.getFullYear() - dob.getFullYear();
      const m = now.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
      return sum + age;
    }, 0);
    return Math.round(totalAge / patients.length);
  };

  return (
    <div style={containerStyle}>
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading patients...</p>
      ) : (
        <>
          {/* Centered one-line metrics */}
          <div style={metricsStyle}>
            Patients count: {patients.length} | Avg age: {calculateAvgAge()}
          </div>

          {/* Scrollable table */}
          <div style={tableWrapperStyle}>
            <table style={tableStyle}>
              <thead style={theadStyle}>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>DOB</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p, idx) => (
                  <tr key={p.id} style={idx % 2 === 0 ? rowEvenStyle : rowOddStyle}>
                    <td>{idx + 1}</td>
                    <td>{p.fullName}</td>
                    <td>{p.gender}</td>
                    <td>{p.email}</td>
                    <td>{p.phone}</td>
                    <td>{formatDOB(p.dateOfBirth)}</td>
                    <td>
                      <button style={editButtonStyle} onClick={() => onEdit(p)}>
                        Edit
                      </button>
                      <button
                        style={deleteButtonStyle}
                        onClick={() => handleDeleteClick(p.id)}
                        disabled={deletingId === p.id}
                      >
                        {deletingId === p.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {dialog.show && (
        <ConfirmationDialog
          message="Are you sure you want to delete this patient?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

// ===== Styles =====
const containerStyle = { width: "100%", overflowX: "auto" };
const metricsStyle = {
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "18px",
  marginBottom: "15px",
};
const tableWrapperStyle = {
  overflowX: "auto",
  maxHeight: "500px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "900px",
  fontSize: "16px",
};
const theadStyle = {
  backgroundColor: "#1976d2",
  color: "white",
  fontWeight: "bold",
  textAlign: "left",
  fontSize: "18px",    // increased font size
  height: "60px",      // increased row height for header
};
const rowEvenStyle = { backgroundColor: "#f9f9f9", height: "50px" };
const rowOddStyle = { backgroundColor: "#fff", height: "50px" };
const editButtonStyle = {
  marginRight: "5px",
  padding: "8px 12px",
  backgroundColor: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
const deleteButtonStyle = {
  padding: "8px 12px",
  backgroundColor: "#d32f2f",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default Patients;