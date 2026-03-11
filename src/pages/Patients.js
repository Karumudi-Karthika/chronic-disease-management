// src/pages/Patients.js
import React, { useState, useEffect } from "react";
import { getPatients, deletePatient, getVitals, addVital } from "../services/api";
import ConfirmationDialog from "../components/ConfirmationDialog";

// Risk calculation based on vitals
function getRisk(vitals) {
  if (!vitals || vitals.length === 0) return null;
  const latest = vitals[vitals.length - 1];
  const { heartRate, bloodPressureSystolic, temperature } = latest;

  let score = 0;
  if (heartRate > 100 || heartRate < 60) score++;
  if (bloodPressureSystolic > 140) score += 2;
  else if (bloodPressureSystolic > 120) score++;
  if (temperature > 38.5 || temperature < 36) score++;

  if (score >= 3) return { label: "High Risk", color: "#d32f2f", bg: "#ffebee" };
  if (score >= 1) return { label: "Medium Risk", color: "#f57c00", bg: "#fff3e0" };
  return { label: "Low Risk", color: "#388e3c", bg: "#e8f5e9" };
}

function VitalsModal({ patient, onClose, showNotification }) {
  const [vitals, setVitals] = useState([]);
  const [form, setForm] = useState({
    temperature: "", heartRate: "", bloodPressureSystolic: "",
    bloodPressureDiastolic: "", recordedAt: new Date().toISOString().slice(0, 10),
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getVitals(patient.id).then(setVitals).catch(() => {});
  }, [patient.id]);

  const validate = () => {
    const e = {};
    if (!form.temperature || isNaN(form.temperature)) e.temperature = "Required (e.g. 36.6)";
    if (!form.heartRate || isNaN(form.heartRate)) e.heartRate = "Required (e.g. 72)";
    if (!form.bloodPressureSystolic || isNaN(form.bloodPressureSystolic)) e.bloodPressureSystolic = "Required (e.g. 120)";
    if (!form.bloodPressureDiastolic || isNaN(form.bloodPressureDiastolic)) e.bloodPressureDiastolic = "Required (e.g. 80)";
    if (!form.recordedAt) e.recordedAt = "Required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    try {
      await addVital({
        patientId: patient.id,
        temperature: parseFloat(form.temperature),
        heartRate: parseInt(form.heartRate),
        bloodPressureSystolic: parseInt(form.bloodPressureSystolic),
        bloodPressureDiastolic: parseInt(form.bloodPressureDiastolic),
        recordedAt: new Date(form.recordedAt).toISOString(),
      });
      const updated = await getVitals(patient.id);
      setVitals(updated);
      setForm({ temperature: "", heartRate: "", bloodPressureSystolic: "", bloodPressureDiastolic: "", recordedAt: new Date().toISOString().slice(0, 10) });
      setErrors({});
      showNotification("Vitals recorded!");
    } catch { showNotification("Failed to save vitals", "error"); }
  };

  const risk = getRisk(vitals);

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h2 style={{ margin: 0 }}>Vitals — {patient.fullName}</h2>
          <button onClick={onClose} style={closeBtnStyle}>✕</button>
        </div>

        <p style={{ margin: "0 0 10px", color: "#555" }}>
          Disease: <strong>{patient.disease || "N/A"}</strong>
          {risk && (
            <span style={{ marginLeft: "15px", padding: "3px 10px", borderRadius: "12px", backgroundColor: risk.bg, color: risk.color, fontWeight: "bold" }}>
              {risk.label}
            </span>
          )}
        </p>

        {/* Add Vitals Form */}
        <form onSubmit={handleSubmit} style={{ backgroundColor: "#f5f5f5", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
          <h3 style={{ margin: "0 0 10px" }}>Record New Vitals</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[
              { key: "temperature", label: "Temperature (°C)" },
              { key: "heartRate", label: "Heart Rate (bpm)" },
              { key: "bloodPressureSystolic", label: "BP Systolic (mmHg)" },
              { key: "bloodPressureDiastolic", label: "BP Diastolic (mmHg)" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label style={{ fontSize: "13px", fontWeight: "500" }}>{label}</label>
                <input
                  type="number" step="any"
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  style={modalInputStyle}
                />
                {errors[key] && <span style={errorStyle}>{errors[key]}</span>}
              </div>
            ))}
          </div>
          <div style={{ marginTop: "10px" }}>
            <label style={{ fontSize: "13px", fontWeight: "500" }}>Date</label>
            <input type="date" value={form.recordedAt}
              onChange={(e) => setForm({ ...form, recordedAt: e.target.value })}
              style={{ ...modalInputStyle, width: "200px" }} />
          </div>
          <button type="submit" style={{ ...saveBtnStyle, marginTop: "12px" }}>Save Vitals</button>
        </form>

        {/* Vitals History */}
        <h3 style={{ margin: "0 0 10px" }}>Vitals History</h3>
        {vitals.length === 0 ? (
          <p style={{ color: "#888" }}>No vitals recorded yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead style={{ backgroundColor: "#1976d2", color: "white" }}>
                <tr>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Temp (°C)</th>
                  <th style={thStyle}>Heart Rate</th>
                  <th style={thStyle}>BP (S/D)</th>
                  <th style={thStyle}>Risk</th>
                </tr>
              </thead>
              <tbody>
                {vitals.map((v, i) => {
                  const vRisk = getRisk([v]);
                  return (
                    <tr key={v.id} style={{ backgroundColor: i % 2 === 0 ? "#fafafa" : "#fff" }}>
                      <td style={tdStyle}>{new Date(v.recordedAt).toLocaleDateString()}</td>
                      <td style={tdStyle}>{v.temperature}</td>
                      <td style={tdStyle}>{v.heartRate} bpm</td>
                      <td style={tdStyle}>{v.bloodPressureSystolic}/{v.bloodPressureDiastolic}</td>
                      <td style={tdStyle}>
                        {vRisk && (
                          <span style={{ fontSize: "12px", padding: "2px 8px", borderRadius: "10px", backgroundColor: vRisk.bg, color: vRisk.color, fontWeight: "bold" }}>
                            {vRisk.label}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Patients({ showNotification, onEdit }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [dialog, setDialog] = useState({ show: false, patientId: null });
  const [vitalsPatient, setVitalsPatient] = useState(null);
  const [patientVitals, setPatientVitals] = useState({});

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const data = await getPatients();
      setPatients(data);
      const vitalsMap = {};
      await Promise.all(data.map(async (p) => {
        try { vitalsMap[p.id] = await getVitals(p.id); }
        catch { vitalsMap[p.id] = []; }
      }));
      setPatientVitals(vitalsMap);
    } catch {
      showNotification("Failed to fetch patients", "error");
    }
    setLoading(false);
  };

  useEffect(() => { fetchPatients(); }, []);

  const handleDeleteClick = (id) => setDialog({ show: true, patientId: id });
  const handleCancelDelete = () => setDialog({ show: false, patientId: null });

  const handleConfirmDelete = async () => {
    const id = dialog.patientId;
    setDialog({ show: false, patientId: null });
    setDeletingId(id);
    try {
      await deletePatient(id);
      showNotification("Patient deleted successfully!");
      fetchPatients();
    } catch {
      showNotification("Failed to delete patient", "error");
    }
    setDeletingId(null);
  };

  const formatDOB = (dob) => {
    if (!dob) return "";
    const date = new Date(dob);
    return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
  };

  const calculateAvgAge = (patients) => {
    if (!patients.length) return 0;
    const now = new Date();
    const totalAge = patients.reduce((sum, p) => {
      if (!p.dateOfBirth) return sum;
      const dob = new Date(p.dateOfBirth);
      let age = now.getFullYear() - dob.getFullYear();
      if (now.getMonth() - dob.getMonth() < 0 || (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate())) age--;
      return sum + age;
    }, 0);
    return Math.round(totalAge / patients.length);
  };

  const diseaseCounts = patients.reduce((acc, p) => {
    const d = p.disease || "Unknown";
    acc[d] = (acc[d] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={containerStyle}>
      {loading ? <p style={{ textAlign: "center" }}>Loading patients...</p> : (
        <>
          {/* Metrics */}
          <div style={metricsStyle}>
            <span>Patients: <strong>{patients.length}</strong></span>
            <span style={{ margin: "0 20px" }}>|</span>
            <span>Avg Age: <strong>{calculateAvgAge(patients)}</strong></span>
            <span style={{ margin: "0 20px" }}>|</span>
            {Object.entries(diseaseCounts).map(([disease, count]) => (
              <span key={disease} style={{ marginRight: "15px" }}>
                {disease}: <strong>{count}</strong>
              </span>
            ))}
          </div>

          {/* Patients Table */}
          <div style={tableWrapperStyle}>
            <table style={tableStyle}>
              <thead style={theadStyle}>
                <tr>
                  <th style={thStyle}>#</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Gender</th>
                  <th style={thStyle}>Disease</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>DOB</th>
                  <th style={thStyle}>Risk</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p, idx) => {
                  const risk = getRisk(patientVitals[p.id]);
                  return (
                    <tr key={p.id} style={idx % 2 === 0 ? rowEvenStyle : rowOddStyle}>
                      <td style={tdStyle}>{idx + 1}</td>
                      <td style={tdStyle}>{p.fullName}</td>
                      <td style={tdStyle}>{p.gender}</td>
                      <td style={tdStyle}>
                        <span style={{ padding: "3px 8px", borderRadius: "10px", backgroundColor: "#e3f2fd", color: "#1565c0", fontSize: "13px" }}>
                          {p.disease || "N/A"}
                        </span>
                      </td>
                      <td style={tdStyle}>{p.email}</td>
                      <td style={tdStyle}>{p.phone}</td>
                      <td style={tdStyle}>{formatDOB(p.dateOfBirth)}</td>
                      <td style={tdStyle}>
                        {risk ? (
                          <span style={{ padding: "3px 8px", borderRadius: "10px", backgroundColor: risk.bg, color: risk.color, fontSize: "13px", fontWeight: "bold" }}>
                            {risk.label}
                          </span>
                        ) : <span style={{ color: "#aaa", fontSize: "13px" }}>No vitals</span>}
                      </td>
                      <td style={tdStyle}>
                        <button style={editBtnStyle} onClick={() => onEdit(p)}>Edit</button>
                        <button style={vitalsBtnStyle} onClick={() => setVitalsPatient(p)}>Vitals</button>
                        <button style={deleteBtnStyle} onClick={() => handleDeleteClick(p.id)} disabled={deletingId === p.id}>
                          {deletingId === p.id ? "..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
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

      {vitalsPatient && (
        <VitalsModal
          patient={vitalsPatient}
          onClose={() => { setVitalsPatient(null); fetchPatients(); }}
          showNotification={showNotification}
        />
      )}
    </div>
  );
}

// Styles
const containerStyle = { width: "100%", overflowX: "auto" };
const metricsStyle = { display: "flex", alignItems: "center", flexWrap: "wrap", padding: "12px 16px", backgroundColor: "#f0f8ff", borderRadius: "8px", margin: "0 0 15px 0", fontSize: "15px", border: "1px solid #bbdefb" };
const tableWrapperStyle = { overflowX: "auto", maxHeight: "500px", border: "1px solid #ccc", borderRadius: "5px" };
const tableStyle = { width: "100%", borderCollapse: "collapse", minWidth: "1000px", fontSize: "15px" };
const theadStyle = { backgroundColor: "#1976d2", color: "white", fontWeight: "bold", textAlign: "left", height: "50px", position: "sticky", top: 0 };
const thStyle = { padding: "10px 12px" };
const tdStyle = { padding: "10px 12px", borderBottom: "1px solid #eee" };
const rowEvenStyle = { backgroundColor: "#f9f9f9", height: "50px" };
const rowOddStyle = { backgroundColor: "#fff", height: "50px" };
const editBtnStyle = { marginRight: "5px", padding: "6px 10px", backgroundColor: "#1976d2", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" };
const vitalsBtnStyle = { marginRight: "5px", padding: "6px 10px", backgroundColor: "#7b1fa2", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" };
const deleteBtnStyle = { padding: "6px 10px", backgroundColor: "#d32f2f", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px" };
const overlayStyle = { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
const modalStyle = { backgroundColor: "#fff", padding: "25px", borderRadius: "10px", width: "700px", maxWidth: "95vw", maxHeight: "85vh", overflowY: "auto", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" };
const closeBtnStyle = { background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#555" };
const modalInputStyle = { width: "100%", padding: "7px", borderRadius: "4px", border: "1px solid #ccc", marginTop: "3px" };
const saveBtnStyle = { padding: "8px 16px", backgroundColor: "#7b1fa2", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" };
const errorStyle = { color: "red", fontSize: "12px" };

export default Patients;
