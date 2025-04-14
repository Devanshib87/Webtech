// src/components/StudentForm.js
import React, { useState } from 'react';
import './StudentForm.css'; // Import CSS

// Accepts the onStudentSubmit function (which should handle the API call)
function StudentForm({ onStudentSubmit }) {
  // State for each form field
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [school, setSchool] = useState('');
  const [needs, setNeeds] = useState('');
  const [amount, setAmount] = useState('');

  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', or 'error'
  const [submitMessage, setSubmitMessage] = useState(''); // Message for error/success

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setIsSubmitting(true);  // Set loading state
    setSubmitStatus(null);  // Reset previous status
    setSubmitMessage('');

    // Basic validation (can be expanded)
    if (!name || !grade || !school || !needs || !amount || parseFloat(amount) <= 0) {
        setSubmitStatus('error');
        setSubmitMessage('Please fill in all fields correctly.');
        setIsSubmitting(false);
        return;
    }

    const studentData = {
      name,
      grade,
      school,
      needs,
      amount: parseFloat(amount), // Ensure amount is a number
    };

    try {
      // Call the prop function passed from App.js (which contains the API logic)
      // Use 'await' because the function in App.js is async
      await onStudentSubmit(studentData);

      // --- Success ---
      setSubmitStatus('success');
      setSubmitMessage('Registration Submitted Successfully!');
      // Clear the form
      setName('');
      setGrade('');
      setSchool('');
      setNeeds('');
      setAmount('');

      // Optional: Hide success message after a delay
      setTimeout(() => setSubmitStatus(null), 5000);

    } catch (error) {
      // --- Error ---
      console.error("Submission failed:", error);
      setSubmitStatus('error');
      // Provide a user-friendly error message
      setSubmitMessage(error.message || 'Submission failed. Please try again.');

    } finally {
      // --- Always run ---
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <div className="student-form-container">
      <h2>Register as a Student</h2>

      {/* --- Submission Feedback Area --- */}
      {submitStatus && (
        <p className={`form-feedback ${submitStatus}`}>
          {submitMessage}
        </p>
      )}
      {/* --- End Feedback Area --- */}

      <form onSubmit={handleSubmit} className="student-form" noValidate> {/* Add noValidate to rely on JS validation */}
        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSubmitting}
            aria-describedby={submitStatus === 'error' && !name ? 'name-error' : null}
          />
          {/* Example inline error (can be added for all fields) */}
          {submitStatus === 'error' && !name && <span id="name-error" style={{ color: 'var(--error-text)', fontSize: '0.8rem' }}>Name is required.</span>}
        </div>

        {/* Grade/Class */}
        <div className="form-group">
          <label htmlFor="grade">Grade/Class:</label>
          <input
            type="text"
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        {/* School Name */}
        <div className="form-group">
          <label htmlFor="school">School Name:</label>
          <input
            type="text"
            id="school"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Describe Needs */}
        <div className="form-group">
          <label htmlFor="needs">Describe Your Needs:</label>
          <textarea
            id="needs"
            value={needs}
            onChange={(e) => setNeeds(e.target.value)}
            rows="4"
            placeholder="E.g., Tuition fees, books, uniform, stationery..."
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Requested Amount */}
        <div className="form-group">
          <label htmlFor="amount">Requested Amount ($):</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1" // Minimum request amount
            step="any" // Allow decimals
            placeholder="e.g., 500"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Register for Sponsorship'}
        </button>
      </form>
    </div>
  );
}

export default StudentForm;