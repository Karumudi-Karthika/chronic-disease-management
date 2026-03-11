// src/App.js
import React, { useState } from "react";
import Patients from "./pages/Patients";
import AddOrEditPatient from "./pages/AddOrEditPatient";
import Notification from "./components/Notification";

function App() {
  const [notification, setNotification] = useState({ message: "", type: "success" });
  const [activeTab, setActiveTab] = useState("patients");
  const [editingPatient, setEditingPatient] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const showNotification = (msg, type = "success") => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification({ message: "", type }), 3000);
  };

  // Called when Add or Edit is done
  const handleAddOrEdit = () => {
    setEditingPatient(null);
    setActiveTab("patients");
    setRefreshKey((k) => k + 1); // refresh patient list
    showNotification(editingPatient ? "Patient updated successfully!" : "Patient added successfully!");
  };

  // Called from Patients table when Edit is clicked
  const handleEditClick = (patient) => {
    setEditingPatient(patient);
    setActiveTab("add");
  };

  // When switching to Patients tab, clear editing state
  const handleTabSwitch = (tab) => {
    if (tab === "patients") setEditingPatient(null);
    setActiveTab(tab);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Chronic Disease Management System
      </h1>

      <Notification message={notification.message} type={notification.type} />

      {/* Tabs */}
      <div style={{ marginBottom: "25px" }}>
        <button
          style={activeTab === "patients" ? tabActiveStyle : tabStyle}
          onClick={() => handleTabSwitch("patients")}
        >
          Patients
        </button>
        <button
          style={activeTab === "add" ? tabActiveStyle : tabStyle}
          onClick={() => handleTabSwitch("add")}
        >
          {editingPatient ? "Edit Patient" : "Add Patient"}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "patients" && (
        <Patients
          key={refreshKey}
          showNotification={showNotification}
          onEdit={handleEditClick}
        />
      )}

      {activeTab === "add" && (
        <AddOrEditPatient
          editingPatient={editingPatient}
          onAddOrEdit={handleAddOrEdit}
        />
      )}
    </div>
  );
}

const tabStyle = {
  padding: "10px 24px",
  marginRight: "10px",
  fontWeight: "normal",
  border: "1px solid #1976d2",
  borderRadius: "5px",
  backgroundColor: "white",
  color: "#1976d2",
  cursor: "pointer",
  fontSize: "15px",
};

const tabActiveStyle = {
  ...tabStyle,
  fontWeight: "bold",
  backgroundColor: "#1976d2",
  color: "white",
};

export default App;
