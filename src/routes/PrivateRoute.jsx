// src/routes/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth.js';

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

export default PrivateRoute;
