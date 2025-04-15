// src/utils/axiosInstance.js
import axios from 'axios';
import { getToken, logout } from './auth';
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to every request
instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token errors globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      logout(); // remove token from session storage
      window.location.href = '/login'; // redirect to login
    }
    return Promise.reject(error);
  }
);

export default instance;
