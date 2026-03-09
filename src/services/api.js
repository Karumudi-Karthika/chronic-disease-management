import axios from "axios";

const API_BASE = "http://localhost:5094/api";

// Example: Set token dynamically
const token = localStorage.getItem("token"); // store a JWT after login
if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export const getPatients = () => axios.get(`${API_BASE}/patients`);
export const addPatient = (patient) => axios.post(`${API_BASE}/patients`, patient);
export const updatePatient = (id, patient) => axios.put(`${API_BASE}/patients/${id}`, patient);
export const deletePatient = (id) => axios.delete(`${API_BASE}/patients/${id}`);