// src/Pages/Sponsors.js
import React from 'react';
import StudentList from '../components/StudentList'; // Import the list component

// Accept the students array as a prop
function Sponsors({ students }) {
  return (
    <div>
      {/* You can add general sponsor info here if needed */}
      {/* Pass the students array down to the StudentList component */}
      <StudentList students={students} />
    </div>
  );
}

export default Sponsors;