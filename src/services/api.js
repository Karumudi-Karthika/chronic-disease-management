import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const getPatients = () => axios.get(`${API_BASE}/patients`).then(r => r.data);
export const addPatient = (patient) => axios.post(`${API_BASE}/patients`, patient).then(r => r.data);
export const updatePatient = (id, patient) => axios.put(`${API_BASE}/patients/${id}`, patient);
export const deletePatient = (id) => axios.delete(`${API_BASE}/patients/${id}`);

export const getVitals = (patientId) =>
  axios.get(`${API_BASE}/vitals?patientId=${patientId}`).then(r => r.data);
export const addVital = (vital) => axios.post(`${API_BASE}/vitals`, vital).then(r => r.data);
export const updateVital = (id, vital) => axios.put(`${API_BASE}/vitals/${id}`, vital);
export const deleteVital = (id) => axios.delete(`${API_BASE}/vitals/${id}`);
