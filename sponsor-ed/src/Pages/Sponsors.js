// src/Pages/Sponsors.js
import React from 'react';
import StudentList from '../components/StudentList'; // Import the list component

// This page receives the students array, loading, and error state from App.js
function Sponsors({ students, loading, error }) {
  return (
    <div>
      {/* Optional: Add title or intro text specific to sponsors */}
      {/*
      <div style={{ textAlign: 'center', padding: '20px 0', maxWidth: '800px', margin: '0 auto'}}>
          <h1>Find a Student to Sponsor</h1>
          <p>Browse the profiles below to find a student whose educational journey you'd like to support. Your contribution makes a direct impact.</p>
      </div>
      */}

      {/* Render the StudentList, passing down the necessary props */}
      <StudentList students={students} loading={loading} error={error} />
    </div>
  );
}

export default Sponsors;