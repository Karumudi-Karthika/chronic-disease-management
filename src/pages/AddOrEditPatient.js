// src/pages/AddOrEditPatient.js
import React, { useState, useEffect } from "react";
import { addPatient, updatePatient } from "../services/api";

function AddOrEditPatient({ onAddOrEdit, editingPatient }) {
  const [patient, setPatient] = useState({
    fullName: "",
    gender: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    disease: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingPatient) {
      let dob = "";
      if (editingPatient.dateOfBirth) {
        const dateObj = new Date(editingPatient.dateOfBirth);
        const yyyy = dateObj.getFullYear().toString().padStart(4, "0");
        const mm = (dateObj.getMonth() + 1).toString().padStart(2, "0");
        const dd = dateObj.getDate().toString().padStart(2, "0");
        dob = `${yyyy}-${mm}-${dd}`;
      }
      setPatient({ ...editingPatient, dateOfBirth: dob, disease: editingPatient.disease || "" });
    }
  }, [editingPatient]);

  const validateField = (name, value) => {
    let msg = "";
    if (name === "fullName" && !value.trim()) msg = "Name is required";
    if (name === "gender" && !value) msg = "Gender is required";
    if (name === "disease" && !value) msg = "Disease is required";
    if (name === "phone" && !/^04\d{8}$/.test(value)) msg = "Phone should be in Australian format.";
    if (name === "email" && !/^[^\s@]+@gmail\.com$/.test(value)) msg = "Use a valid email address.";
    if (name === "dateOfBirth") {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) msg = "Date should be YYYY-MM-DD";
      else {
        const [y, m, d] = value.split("-").map(Number);
        const dateObj = new Date(value);
        if (
          y < 1900 ||
          y > new Date().getFullYear() ||
          m < 1 || m > 12 ||
          d < 1 || d > 31 ||
          dateObj.getFullYear() !== y ||
          dateObj.getMonth() + 1 !== m ||
          dateObj.getDate() !== d
        ) msg = "Date should be valid YYYY-MM-DD";
      }
    }
    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && /\D/.test(value)) return;
    setPatient({ ...patient, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Object.keys(patient).forEach((key) => validateField(key, patient[key]));
    if (Object.values(errors).some((v) => v)) return;

    try {
      if (editingPatient) await updatePatient(editingPatient.id, patient);
      else await addPatient(patient);

      setPatient({ fullName: "", gender: "", email: "", phone: "", dateOfBirth: "", disease: "" });
      onAddOrEdit();
    } catch (err) {
      console.error("Failed to save patient:", err);
      alert("Failed to save patient");
    }
  };

  const fields = ["fullName", "gender", "email", "phone", "dateOfBirth", "disease"];

  const dropdownFields = {
    gender: ["Male", "Female", "Other"],
    disease: ["Diabetes", "Hypertension", "Asthma", "Heart Disease", "Arthritis", "Other"],
  };

  const labelMap = {
    fullName: "Name",
    gender: "Gender",
    email: "Email",
    phone: "Phone",
    dateOfBirth: "Date of Birth",
    disease: "Chronic Disease",
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", marginTop: "20px" }}>
      <h2>{editingPatient ? "Edit Patient" : "Add Patient"}</h2>

      {fields.map((field) => (
        <div style={{ marginBottom: "15px" }} key={field}>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
            {labelMap[field]}:
          </label>

          {dropdownFields[field] ? (
            <select name={field} value={patient[field]} onChange={handleChange} style={inputStyle}>
              <option value="">Select</option>
              {dropdownFields[field].map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              type={field === "dateOfBirth" ? "date" : "text"}
              name={field}
              value={patient[field]}
              onChange={handleChange}
              style={inputStyle}
            />
          )}

          {errors[field] && <span style={errorStyle}>{errors[field]}</span>}
        </div>
      ))}

      <button type="submit" style={buttonStyle}>
        {editingPatient ? "Update Patient" : "Add Patient"}
      </button>
    </form>
  );
}

const inputStyle = { width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" };
const buttonStyle = { padding: "10px 15px", backgroundColor: "#1976d2", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" };
const errorStyle = { color: "red", fontSize: "0.9em", display: "block", marginTop: "5px" };

export default AddOrEditPatient;
