// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setToken, isAuthenticated } from '../utils/auth.js'; // Utility to save token

const Login = () => {
  const [username, setUsername] = useState('john@mail.com');
  const [password, setPassword] = useState('changeme');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Checking authentication...');
    if (isAuthenticated()) { // Fix: Call the function isAuthenticated()
      console.log('User is already logged in, redirecting...');
      navigate('/dashboard'); // Redirect to dashboard if already logged in
    }
  }, [navigate]); // Dependency is 'navigate' only

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to API
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email: username, // Use "email" instead of "username"
          password: password,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(response.data);
      // Save the JWT token to sessionStorage
      setToken(response.data.access_token);

      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials or server error');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
