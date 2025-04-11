// src/Pages/Students.js
import React from 'react';
import StudentForm from '../components/StudentForm'; // Ensure correct path (lowercase 'c')

// Accept the onAddStudent prop from App.js
function Students({ onAddStudent }) {
  return (
    <div>
      {/* Pass the function down to the StudentForm */}
      <StudentForm onStudentSubmit={onAddStudent} /> {/* Changed prop name for clarity */}
    </div>
  );
}

export default Students;