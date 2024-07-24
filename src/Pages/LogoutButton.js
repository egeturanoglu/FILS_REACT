import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Pages/AuthContext';
import logout_icon from '../Assets/logout_icon.png';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      <img src={logout_icon} alt="logout_icon" className="icon" />
      <span className="text">Logout</span>
    </button>
  );
};

export default LogoutButton;
