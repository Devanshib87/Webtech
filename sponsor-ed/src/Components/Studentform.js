import React, { useState } from 'react';
import './StudentForm.css'; // We'll create this CSS file next

function StudentForm() {
  // State for each form field
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [school, setSchool] = useState('');
  const [needs, setNeeds] = useState(''); // What the student needs sponsorship for
  const [amount, setAmount] = useState(''); // Requested amount

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default browser form submission
    // --- For now, just log the data to the console ---
    // --- Later, this is where you would send data to a backend server ---
    console.log('Student Data Submitted:');
    console.log({
      name,
      grade,
      school,
      needs,
      amount: parseFloat(amount) || 0 // Convert amount to a number
    });

    // --- Optional: Clear the form after submission ---
    setName('');
    setGrade('');
    setSchool('');
    setNeeds('');
    setAmount('');

    alert('Student registration submitted! Check the console for data.'); // Simple feedback
  };

  return (
    <div className="student-form-container">
      <h2>Register as a Student</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update state on change
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="grade">Grade/Class:</label>
          <input
            type="text" // Could be number, but text is flexible
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="school">School Name:</label>
          <input
            type="text"
            id="school"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="needs">Describe Your Needs:</label>
          <textarea
            id="needs"
            value={needs}
            onChange={(e) => setNeeds(e.target.value)}
            rows="4"
            placeholder="E.g., Tuition fees, books, uniform, stationery..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Requested Amount ($):</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="any" // Allows decimals
            placeholder="e.g., 500"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Register for Sponsorship</button>
      </form>
    </div>
  );
}

export default StudentForm;