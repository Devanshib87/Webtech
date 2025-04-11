// src/components/StudentList.js
import React from 'react';
import './StudentList.css'; // We'll create this CSS file next

// Accept the students array as a prop
function StudentList({ students }) {

  // If there are no students, show a message
  if (!students || students.length === 0) {
    return <p style={{ textAlign: 'center', padding: '20px' }}>No students registered yet.</p>;
  }

  return (
    <div className="student-list-container">
      <h2>Students Seeking Sponsorship</h2>
      <ul className="student-list">
        {students.map(student => (
          <li key={student.id} className="student-list-item">
            <h3>{student.name}</h3>
            <p><strong>Grade:</strong> {student.grade}</p>
            <p><strong>School:</strong> {student.school}</p>
            <p><strong>Needs:</strong> {student.needs}</p>
            <p><strong>Amount Requested:</strong> ${student.amount.toFixed(2)}</p>
            {/* Add a Sponsor button later */}
            <button className="sponsor-button">Sponsor {student.name.split(' ')[0]}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;