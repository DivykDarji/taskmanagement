// Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file for styling

const Header = () => {
  return (
    <header className="header-container">
      <nav>
        <ul>
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/signup" className="nav-link">Sign In </Link></li>
          <li><Link to="/login" className="nav-link">Log In</Link></li>
          <li><Link to="/contact" className="nav-link">About</Link></li> 
        </ul>
      </nav>
    </header>
  );
};

export default Header;
