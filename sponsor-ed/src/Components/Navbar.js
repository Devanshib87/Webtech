import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link
import './Navbar.css'; // Assuming Navbar.css is in the same folder

function Navbar() {
  return (
    <nav className="navbar">
      {/* Make the brand title a link to home */}
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
         <h2>📚 SponsorED</h2>
      </Link>
      <ul>
        {/* 2. Replace <li> with Link components */}
        <li>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        </li>
        <li>
          <Link to="/students" style={{ color: 'white', textDecoration: 'none' }}>Students</Link>
        </li>
        <li>
          <Link to="/sponsors" style={{ color: 'white', textDecoration: 'none' }}>Sponsors</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;