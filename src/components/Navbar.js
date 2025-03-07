import React from 'react';
import { Link } from 'react-router-dom';
import { CameraAlt, List, Home, BookmarkBorder, AccountCircle } from '@mui/icons-material';

const Navbar = () => {
    return (
      <nav style={navbarStyle}>
      <ul style={navListStyle}>
        <li style={navItemStyle}>
          <Link to="/scan-recipes" style={linkStyle}><CameraAlt sx={{ fontSize: 36 }} /></Link> 
        </li>
        <li style={navItemStyle}>
          <Link to="/shopping-lists" style={linkStyle}><List sx={{ fontSize: 36 }} /></Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/" style={linkStyle}><Home sx={{ fontSize: 36 }} /></Link> 
        </li>
        <li style={navItemStyle}>
          <Link to="/saved-recipes" style={linkStyle}><BookmarkBorder sx={{ fontSize: 36 }} /></Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/my-profile" style={linkStyle}><AccountCircle sx={{ fontSize: 36 }} /></Link> 
        </li>
      </ul>
    </nav>
    );
  };
  
  const navbarStyle = {
    backgroundColor: 'white',
    padding: '20px 0',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 1000,
    height: '20px',
    boxShadow: '0px -4px 10px rgba(0, 0, 0, 0.2)', 
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
  color: '#000',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  fontSize: '35px',
};

export default Navbar;