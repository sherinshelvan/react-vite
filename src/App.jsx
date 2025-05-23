// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import NotFound from './components/pages/NotFound';
import Dashboard from './components/Dashboard';
import Users from './components/users/UsersList';
import UserDetails from './components/users/UserDetails';
import EditUser from './components/users/EditUser';
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><Layout><Users /></Layout></PrivateRoute>} />
        <Route path="/users/:id" element={<PrivateRoute><Layout><UserDetails /></Layout></PrivateRoute>} />
        <Route path="/users/edit/:id" element={<PrivateRoute><Layout><EditUser /></Layout></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
