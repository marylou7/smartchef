import React from 'react';
import { Link } from 'react-router-dom';
import { FaCamera, FaList, FaHome, FaBookmark, FaUser } from 'react-icons/fa';

const Navbar = () => {
    return (
      <nav style={navbarStyle}>
        <ul style={navListStyle}>
          <li style={navItemStyle}>
            <Link to="/scan-recipes" style={linkStyle}><FaCamera /></Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/shopping-lists" style={linkStyle}><FaList /></Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/" style={linkStyle}><FaHome /></Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/saved-recipes" style={linkStyle}><FaBookmark /></Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/my-profile" style={linkStyle}><FaUser /></Link>
          </li>
        </ul>
      </nav>
    );
  };
  
const navbarStyle = {
    backgroundColor: '#333',
    padding: '20px 0',
    position: 'fixed',    
    bottom: 0,             
    width: '100%',         
    zIndex: 1000,          
};

const navListStyle = {
  display: 'flex',
  justifyContent: 'space-around', // distribute items evenly
  listStyleType: 'none',
  margin: 0,
  padding: 0,
};

const navItemStyle = {
  margin: '0 15px',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  fontSize: '35px',
};

export default Navbar;