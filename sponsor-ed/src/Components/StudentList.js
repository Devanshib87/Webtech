// src/components/StudentList.js
import React, { useState } from 'react'; // Import useState for button loading
import { Link } from 'react-router-dom';
import './StudentList.css';

// Accept currentUser and onSponsor props
function StudentList({ students, loading, error, currentUser, onSponsor }) {
    // State to track which button is being clicked (to show loading)
    const [sponsoringId, setSponsoringId] = useState(null);

    const handleSponsorClick = async (studentId) => {
        setSponsoringId(studentId); // Set loading state for this specific button
        try {
            // Call the function passed down from App.js
            await onSponsor(studentId);
            // Success is handled by App.js re-fetching data which re-renders this list
        } catch (e) {
            // Error is handled/alerted in App.js, just log here if needed
            console.error("Sponsor click error caught in StudentList:", e);
        } finally {
            setSponsoringId(null); // Reset loading state for the button
        }
    };


    // --- Keep Loading State ---
    if (loading) { /* ... loading spinner JSX ... */ }

    // --- Keep Error State ---
    if (error) { /* ... error message JSX ... */ }

    // --- Keep Empty State ---
    if (!students || students.length === 0) { /* ... empty state JSX ... */ }

    // --- Render List ---
    return (
        <div className="student-list-container">
            <h2>Students Seeking Sponsorship</h2>
            <ul className="student-list">
                {students.map(student => (
                    <li key={student.id} className={`student-list-item ${student.isSponsored ? 'sponsored' : ''}`}>
                        {/* Add a class if sponsored */}
                        <h3>{student.name || 'Unnamed Student'}</h3>
                        <p><strong>Grade:</strong> {student.grade || 'N/A'}</p>
                        <p><strong>School:</strong> {student.school || 'N/A'}</p>
                        <p><strong>Needs:</strong> {student.needs || 'Not specified'}</p>
                        <p><strong>Amount Requested:</strong>
                            {typeof student.amount === 'number' ? `$${student.amount.toFixed(2)}` : 'N/A'}
                        </p>

                        {/* Conditional Rendering for Sponsor Button/Status */}
                        {student.isSponsored ? (
                            <div className="sponsored-status">
                                <i className="fas fa-check-circle"></i> Sponsored
                                {/* Optionally show by whom if needed: by {student.sponsoredBy} */}
                            </div>
                        ) : (
                            // Check if the current user is the one who CREATED the record
                            // Prevent users from sponsoring their own registrations
                            currentUser && student.creatorUid === currentUser.uid ? (
                                <span className="cannot-sponsor-self">Cannot sponsor own registration</span>
                            ) : (
                            <button
                                className="sponsor-button"
                                onClick={() => handleSponsorClick(student.id)}
                                disabled={sponsoringId === student.id} // Disable button while this specific one is processing
                            >
                                {sponsoringId === student.id ? 'Processing...' : `Sponsor ${student.name?.split(' ')[0] ?? 'Student'}`}
                            </button>
                            )
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

// --- Keep existing JSX for loading/error/empty states ---
const LoadingState = () => ( <div className="student-list-container loading-spinner-container"><div className="loading-spinner"></div><p>Loading students...</p></div> );
const ErrorState = ({ error }) => ( <div className="student-list-container error-message-container"><i className="fas fa-exclamation-triangle"></i><h2>Oops! Something went wrong.</h2><p>{error}</p></div> );
const EmptyState = () => ( <div className="empty-state-container"><i className="fas fa-users-slash empty-state-icon"></i><h2>No Students Found</h2><p>There are currently no students registered seeking sponsorship.</p><p>If you are a student needing help, please register:</p><Link to="/students" className="empty-state-link">Register as a Student <i className="fas fa-arrow-right"></i></Link></div> );

// Re-add the loading/error/empty checks at the top of the component function
StudentList = ({ students, loading, error, currentUser, onSponsor }) => {
    const [sponsoringId, setSponsoringId] = useState(null);

    const handleSponsorClick = async (studentId) => { /* ... handler logic from above ... */ };

    if (loading) return <LoadingState />;
    if (error) return <ErrorState error={error} />;
    if (!students || students.length === 0) return <EmptyState />;

    // --- Render List (copy the return statement from above here) ---
    return (
      <div className="student-list-container">
        <h2>Students Seeking Sponsorship</h2>
        <ul className="student-list">
            {students.map(student => (
                <li key={student.id} className={`student-list-item ${student.isSponsored ? 'sponsored' : ''}`}>
                    {/* ... student details h3, p tags ... */}
                    <h3>{student.name || 'Unnamed Student'}</h3>
                    <p><strong>Grade:</strong> {student.grade || 'N/A'}</p>
                    <p><strong>School:</strong> {student.school || 'N/A'}</p>
                    <p><strong>Needs:</strong> {student.needs || 'Not specified'}</p>
                    <p><strong>Amount Requested:</strong>
                        {typeof student.amount === 'number' ? `$${student.amount.toFixed(2)}` : 'N/A'}
                    </p>

                    {/* Conditional Rendering */}
                    {student.isSponsored ? (
                         <div className="sponsored-status">
                             <i className="fas fa-check-circle"></i> Sponsored
                         </div>
                    ) : (
                         currentUser && student.creatorUid === currentUser.uid ? (
                              <span className="cannot-sponsor-self">Cannot sponsor own registration</span>
                         ) : (
                              <button
                                  className="sponsor-button"
                                  onClick={() => handleSponsorClick(student.id)}
                                  disabled={sponsoringId === student.id}
                              >
                                  {sponsoringId === student.id ? 'Processing...' : `Sponsor ${student.name?.split(' ')[0] ?? 'Student'}`}
                              </button>
                         )
                    )}
                </li>
            ))}
        </ul>
      </div>
    );
}; // <-- End of component function definition

export default StudentList;