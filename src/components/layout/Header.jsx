import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth.js'; //

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // sessionStorage.removeItem('jwtToken');
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      {/* <nav>
        <Link to="/dashboard">Dashboard</Link> |{' '}
        <Link to="/users">Users</Link> |{' '}
        <button onClick={handleLogout}>Logout</button>
      </nav> */}
    </header>
  );
};

export default Header;
