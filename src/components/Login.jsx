// src/components/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const [username, setUsername] = useState('john@mail.com');
  const [password, setPassword] = useState('changeme');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('jwtToken');
    if (token) {
      navigate('/dashboard'); // Already logged in
    }
  }, [navigate]);
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Simulate sending username and password to a backend API
      const apiUrl = import.meta.env.VITE_API_URL;
      
      console.log(apiUrl); // should print your API URL

      console.log('Login Function');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email: username, // use "email" instead of "username"
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);

      // If login is successful, save the JWT to sessionStorage
      sessionStorage.setItem('jwtToken', response.data.access_token);

      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (err) {
      // john@mail.com,changeme
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
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
