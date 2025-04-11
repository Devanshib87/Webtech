// src/components/StudentForm.js
import React, { useState } from 'react';
import './StudentForm.css';

// Accept the onStudentSubmit prop
function StudentForm({ onStudentSubmit }) {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [school, setSchool] = useState('');
  const [needs, setNeeds] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // --- Create student data object ---
    const studentData = {
      name,
      grade,
      school,
      needs,
      amount: parseFloat(amount) || 0, // Convert amount to a number
      // status: 'Pending' // Optional: Add a default status
    };

    // --- Call the function passed from App.js ---
    onStudentSubmit(studentData);
    // --- ---

    // Optional: Clear the form
    setName('');
    setGrade('');
    setSchool('');
    setNeeds('');
    setAmount('');

    // Better user feedback
    alert('Student registration submitted successfully!');
  };

  // ... (keep the rest of the return statement with the form JSX)
  return (
    <div className="student-form-container">
      <h2>Register as a Student</h2>
      <form onSubmit={handleSubmit} className="student-form">
        {/* Form groups remain the same */}
         <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="grade">Grade/Class:</label>
          <input type="text" id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="school">School Name:</label>
          <input type="text" id="school" value={school} onChange={(e) => setSchool(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="needs">Describe Your Needs:</label>
          <textarea id="needs" value={needs} onChange={(e) => setNeeds(e.target.value)} rows="4" placeholder="E.g., Tuition fees, books, uniform, stationery..." required />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Requested Amount ($):</label>
          <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} min="0" step="any" placeholder="e.g., 500" required />
        </div>
        <button type="submit" className="submit-btn">Register for Sponsorship</button>
      </form>
    </div>
  );
}

export default StudentForm;