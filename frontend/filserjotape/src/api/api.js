// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7225', // Replace with your API URL
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
