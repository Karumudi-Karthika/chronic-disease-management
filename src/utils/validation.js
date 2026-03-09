// src/utils/validation.js

export const validatePhone = (phone) => /^04\d{8}$/.test(phone);

export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);