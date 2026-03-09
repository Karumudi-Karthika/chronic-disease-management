// src/App.js
import React, { useState, useEffect } from "react";
import Patients from "./pages/Patients";
import Notification from "./components/Notification";
import { getPatients, addPatient, updatePatient } from "./services/api";

function App() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("patients");
  const [editingPatient, setEditingPatient] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "success" });

  // Load patients
  const loadPatients = async () => {
    setLoading(true);
    try {
      const res = await getPatients();
      setPatients(res.data);
    } catch (err) {
      console.error("Failed to load patients:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPatients();
  }, []);

  // Show notification banner
  const showNotification = (msg, type = "success") => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification({ message: "", type }), 3000);
  };

  // Handle add/edit submit
  const handleAddOrEdit = async (patient) => {
    try {
      if (editingPatient) {
        await updatePatient(editingPatient.id, patient);
        showNotification("Patient updated successfully!");
      } else {
        await addPatient(patient);
        showNotification("Patient added successfully!");
      }
      setActiveTab("patients");
      setEditingPatient(null);
      loadPatients();
    } catch (err) {
      console.error(err);
      showNotification("Operation failed", "error");
    }
  };

  // Start editing
  const handleEditClick = (patient) => {
    setEditingPatient(patient);
    setActiveTab("add");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Chronic Disease Management System
      </h1>

      {/* Notification Banner */}
      <Notification message={notification.message} type={notification.type} />

      {/* Tabs */}
      <div style={{ marginBottom: "20px" }}>
        <button
          style={activeTab === "patients" ? tabActiveStyle : tabStyle}
          onClick={() => setActiveTab("patients")}
        >
          Patients
        </button>
        <button
          style={activeTab === "add" ? tabActiveStyle : tabStyle}
          onClick={() => setActiveTab("add")}
        >
          {editingPatient ? "Edit Patient" : "Add Patient"}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "patients" && (
        <Patients
          patients={patients}
          loading={loading}
          refreshPatients={loadPatients}
          onEdit={handleEditClick}
          showNotification={showNotification}
        />
      )}
      {activeTab === "add" && (
        <AddEditPatient patient={editingPatient} onSubmit={handleAddOrEdit} />
      )}
    </div>
  );
}

// Tabs styles
const tabStyle = {
  padding: "10px 20px",
  marginRight: "10px",
  fontWeight: "normal",
  border: "1px solid #1976d2",
  borderRadius: "5px",
  backgroundColor: "white",
  cursor: "pointer",
};
const tabActiveStyle = {
  ...tabStyle,
  fontWeight: "bold",
  backgroundColor: "#1976d2",
  color: "white",
};

// --- Add/Edit form component ---
function AddEditPatient({ patient, onSubmit }) {
  const [form, setForm] = useState({
    fullName: "",
    gender: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (patient) {
      setForm({
        ...patient,
        dateOfBirth: patient.dateOfBirth
          ? patient.dateOfBirth.slice(0, 10)
          : "",
      });
    }
  }, [patient]);

  const validateField = (name, value) => {
    let msg = "";
    if (name === "fullName" && !value.trim()) msg = "Name is required";
    if (name === "gender" && !value) msg = "Gender is required";
    if (name === "phone" && !/^04\d{8}$/.test(value))
      msg = "Phone should be in Australian format.";
    if (name === "email" && !/^[^\s@]+@gmail\.com$/.test(value))
      msg = "Use a valid email address.";
    if (name === "dateOfBirth") {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) msg = "Date should be YYYY-MM-DD";
    }
    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && /\D/.test(value)) return;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Object.keys(form).forEach((key) => validateField(key, form[key]));
    if (Object.values(errors).some((v) => v)) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
      {["fullName", "gender", "email", "phone", "dateOfBirth"].map((f) => (
        <div style={{ marginBottom: "15px" }} key={f}>
          <label>
            {f === "fullName" ? "Name" : f.charAt(0).toUpperCase() + f.slice(1)}:
          </label>
          {f === "gender" ? (
            <select name={f} value={form[f]} onChange={handleChange} style={inputStyle}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <input
              type={f === "dateOfBirth" ? "date" : "text"}
              name={f}
              value={form[f]}
              onChange={handleChange}
              style={inputStyle}
            />
          )}
          {errors[f] && <span style={errorStyle}>{errors[f]}</span>}
        </div>
      ))}
      <button type="submit" style={buttonStyle}>
        {patient ? "Update Patient" : "Add Patient"}
      </button>
    </form>
  );
}

// --- Styles ---
const inputStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};
const buttonStyle = {
  padding: "10px 15px",
  backgroundColor: "#1976d2",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
const errorStyle = {
  color: "red",
  fontSize: "0.9em",
  display: "block",
  marginTop: "5px",
};

export default App;