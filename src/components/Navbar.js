import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { CameraAlt, List, Home, BookmarkBorder, AccountCircle } from '@mui/icons-material';
import './Navbar.css'; 
import { useTerms } from '../TermsContext';

const Navbar = () => {

  const { hasAcceptedTerms } = useTerms(); 
  //const [hasAcceptedTerms, setHasAcceptedTerms] = useState(true); //for testing

  // Only render the navbar if the user has accepted the terms
  if (!hasAcceptedTerms) {
    return null; 
  }

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/scan-recipes" className="nav-link"><CameraAlt sx={{ fontSize: 36 }} /></Link>
        </li>
        <li className="nav-item">
          <Link to="/shopping-lists" className="nav-link"><List sx={{ fontSize: 36 }} /></Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link"><Home sx={{ fontSize: 36 }} /></Link>
        </li>
        <li className="nav-item">
          <Link to="/saved-recipes" className="nav-link"><BookmarkBorder sx={{ fontSize: 36 }} /></Link>
        </li>
        <li className="nav-item">
          <Link to="/my-profile" className="nav-link"><AccountCircle sx={{ fontSize: 36 }} /></Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
