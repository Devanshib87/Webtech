// src/Pages/Sponsors.js
import React from 'react';
import StudentList from '../components/StudentList'; // Import the list component

// Accept the new onSponsor prop along with others
function Sponsors({ students, loading, error, currentUser, onSponsor }) {
  return (
    <div>
      {/* Optional: Add sponsor-specific intro text here */}

      {/* Pass all relevant props down to the StudentList component */}
      <StudentList
        students={students}
        loading={loading}
        error={error}
        currentUser={currentUser} // Pass current user if needed in list
        onSponsor={onSponsor} // Pass the sponsoring handler function
      />
    </div>
  );
}

export default Sponsors;