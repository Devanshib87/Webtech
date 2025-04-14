// src/Pages/Students.js
import React from 'react';
import StudentForm from '../components/StudentForm'; // Import the form component

// This page component receives the onAddStudent function from App.js
function Students({ onAddStudent }) {
  return (
    <div>
      {/* Render the StudentForm and pass down the submission handler */}
      <StudentForm onStudentSubmit={onAddStudent} />

      {/* You could potentially add instructions or FAQs for students here */}
    </div>
  );
}

export default Students;