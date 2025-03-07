import React from 'react';
import { Link } from 'react-router-dom';
import { CameraAlt, List, Home, BookmarkBorder, AccountCircle } from '@mui/icons-material';

const Navbar = () => {
    return (
      <nav style={navbarStyle}>
        <ul style={navListStyle}>
          <li style={navItemStyle}>
            <Link to="/scan-recipes" style={linkStyle}><CameraAlt /></Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/shopping-lists" style={linkStyle}><List /></Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/" style={linkStyle}><Home /></Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/saved-recipes" style={linkStyle}><BookmarkBorder /></Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/my-profile" style={linkStyle}><AccountCircle /></Link>
          </li>
        </ul>
      </nav>
    );
  };
  
const navbarStyle = {
    backgroundColor: '#000',
    padding: '20px 0',
    position: 'fixed',    
    bottom: 0,             
    width: '100%',         
    zIndex: 1000, 
    height: '20px'         
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