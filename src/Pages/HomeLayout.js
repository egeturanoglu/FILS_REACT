import React from 'react';
import { Link } from 'react-router-dom';
import './HomeLayout.css'; 
import person_icon from '../Assets/person_icon.png';
import about_icon from '../Assets/about_icon.png';
import help_icon from '../Assets/help_icon.png';
import only_F from '../Assets/only_F.png';
import forvia_logo from '../Assets/forvia_logo.png';
import home_icon from '../Assets/home_icon.png'; 
import logout_icon from '../Assets/logout_icon.png'; 
import LogoutButton from './LogoutButton';


const HomeLayout = ({ children }) => {
  return (
    <div className="home-layout">
      <div className="sidebar"> 
        <img src={only_F} alt='only_F' className='f_icon' /> 
        <div className="buttons-container">
          <button>
            <Link to="/profile"><img src={person_icon} alt='person_icon' className='icon' /><span className="text">Profile</span></Link>
          </button>
          <button>
          <a href="https://www.forvia.com/en" target="_blank" rel="noopener noreferrer" className="link-button">
          <img src={about_icon} alt='about_icon' className='icon' /><span className="text">About</span></a>
          </button>
          <button>
          <a href="https://www.hella.com/en/Contact-232/" target="_blank" rel="noopener noreferrer" className="link-button"><img src={help_icon} alt='help_icon' className='icon' /><span className="text">Help</span></a>
          </button>
        </div>
        <LogoutButton />
      </div>
      <div className="main-content">
        <div className="topbar">
          <h1>Forvia Internship Learning System</h1>
          <div className="right-icons">
            <img src={forvia_logo} alt='forvia_logo' className='forvia_logo' />
            <Link to="/login/home"><img src={home_icon} alt='home_icon' className='home_icon' /></Link>
          </div>
        </div>
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
