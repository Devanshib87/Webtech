// src/components/StudentList.js
import React from 'react';
import { Link } from 'react-router-dom'; // For the empty state link
import './StudentList.css'; // Import the CSS

// Accept students array, loading state, and error state as props
function StudentList({ students, loading, error }) {

  // --- 1. Loading State ---
  if (loading) {
    return (
      <div className="student-list-container loading-spinner-container">
        <div className="loading-spinner"></div>
        <p>Loading students...</p>
      </div>
    );
  }

  // --- 2. Error State ---
  if (error) {
    return (
      <div className="student-list-container error-message-container">
        <i className="fas fa-exclamation-triangle"></i> {/* Error Icon */}
        <h2>Oops! Something went wrong.</h2>
        <p>{error}</p> {/* Display the error message passed from App.js */}
      </div>
    );
  }

  // --- 3. Empty State ---
  if (!students || students.length === 0) {
    return (
      <div className="empty-state-container">
        <i className="fas fa-users-slash empty-state-icon"></i> {/* Icon */}
        <h2>No Students Found</h2>
        <p>There are currently no students registered seeking sponsorship.</p>
        <p>If you are a student needing help, please register:</p>
        {/* Link styled as a button */}
        <Link to="/students" className="empty-state-link">
          Register as a Student <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    );
  }

  // --- 4. Success State (Render List) ---
  return (
    <div className="student-list-container">
      <h2>Students Seeking Sponsorship</h2>
      <ul className="student-list">
        {students.map(student => (
          <li key={student.id || student.name} className="student-list-item"> {/* Use unique ID */}
             <h3>{student.name || 'Unnamed Student'}</h3>
             <p><strong>Grade:</strong> {student.grade || 'N/A'}</p>
             <p><strong>School:</strong> {student.school || 'N/A'}</p>
             <p><strong>Needs:</strong> {student.needs || 'Not specified'}</p>
             <p><strong>Amount Requested:</strong>
                {/* Format amount as currency, handle missing/invalid amount */}
                {typeof student.amount === 'number'
                    ? `$${student.amount.toFixed(2)}`
                    : 'N/A'}
             </p>
             {/* Sponsor Button - Add onClick handler for API interaction later */}
             <button
                className="sponsor-button"
                onClick={() => alert(`Sponsorship for ${student.name} coming soon!`)} // Placeholder action
             >
                Sponsor {student.name?.split(' ')[0] ?? 'Student'} {/* Use first name */}
             </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;