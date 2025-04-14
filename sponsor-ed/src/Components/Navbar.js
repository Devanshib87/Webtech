import React from 'react';
// Import NavLink for automatic active class styling
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

function Navbar() {
  return (
    <nav className="navbar">
      {/* Brand logo/name linking to home */}
      <NavLink to="/" className="navbar-brand">
        {/* Using a relevant icon */}
        <i className="fas fa-hands-helping"></i>
        <h2>SponsorED</h2>
      </NavLink>

      {/* Navigation Links */}
      <ul>
        <li>
          {/* NavLink automatically gets 'active' class when route matches */}
          <NavLink
            to="/"
            // className={({ isActive }) => isActive ? 'active' : ''} // Manual class check (alternative)
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/students">Register Student</NavLink> {/* Changed text slightly */}
        </li>
        <li>
          <NavLink to="/sponsors">Sponsor a Student</NavLink> {/* Changed text slightly */}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;