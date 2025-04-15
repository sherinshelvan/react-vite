// src/components/Dashboard.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();


  return (
    <div className="dashboard-container">
      <h2>Welcome to the Dashboard</h2>
      <p>This is a protected page.</p>
    </div>
  );
};

export default Dashboard;
