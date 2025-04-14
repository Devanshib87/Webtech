// src/components/Navbar.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import React Router hooks
import { signOut } from "firebase/auth";                 // Import Firebase sign out function
import { auth } from '../firebase';                      // Import your Firebase auth instance
import './Navbar.css';                                     // Import the corresponding CSS file

// Navbar component receives the currently logged-in user object (or null) as a prop
function Navbar({ currentUser }) {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Call Firebase sign out function
      console.log("User logged out");
      navigate('/'); // Redirect to home page after successful logout
    } catch (error) {
      console.error("Logout error:", error); // Log any errors during logout
      // Optionally display an error message to the user
    }
  };

  return (
    <nav className="navbar">
      {/* Brand/logo linked to the homepage */}
      <NavLink to="/" className="navbar-brand">
        <i className="fas fa-hands-helping"></i> {/* Icon */}
        <h2>SponsorED</h2>                      {/* Site Title */}
      </NavLink>

      {/* Navigation list */}
      <ul>
        {/* Always visible links */}
        <li><NavLink to="/">Home</NavLink></li>

        {/* Conditional rendering based on whether a user is logged in */}
        {currentUser ? (
          // --- Links shown ONLY when a user IS logged in ---
          <>
            <li><NavLink to="/students">Register Student</NavLink></li>
            <li><NavLink to="/sponsors">Sponsor Student</NavLink></li>
            {/* Example placeholder for a future profile link */}
            {/* <li><NavLink to="/profile">Profile</NavLink></li> */}
            <li>
              {/* Logout button */}
              <button onClick={handleLogout} className="navbar-logout-btn">
                {/* Display 'Logout' and the first part of the user's email */}
                Logout ({currentUser.email?.split('@')[0]})
              </button>
            </li>
          </>
        ) : (
          // --- Links shown ONLY when NO user is logged in ---
          <>
            <li><NavLink to="/auth">Login / Sign Up</NavLink></li>
            {/* Example of commented-out link for logged-out users */}
            {/* <li><NavLink to="/sponsors">Browse Students</NavLink></li> */}
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar; // Export the component for use in other files