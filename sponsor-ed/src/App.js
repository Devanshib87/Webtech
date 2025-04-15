// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
// --- React Router Imports Grouped Together ---
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    NavLink
} from 'react-router-dom';
// --- End React Router Imports ---

import './App.css'; // Basic App styles

// --- Firebase Imports ---
import { db, auth, app } from './firebase'; // Ensure app is exported from firebase.js
import {
    collection,
    getDocs,
    addDoc,
    doc,        // Import doc reference function
    updateDoc,  // Import updateDoc function
    query,
    orderBy,
    Timestamp,
    where // <<<--- Ensure 'where' is imported for the query
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
// --- End Firebase Imports ---

// --- Component and Page Imports ---
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Students from './Pages/Students';
import Sponsors from './Pages/Sponsors';
import AuthPage from './Pages/AuthPage';
// --- End Component and Page Imports ---


// === Helper Components Defined within App.js ===

// Optional Loading Spinner Component
const LoadingSpinner = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        {/* Make sure you have CSS for .loading-spinner, e.g., in index.css or App.css */}
        <div className="loading-spinner"></div>
    </div>
);

// Protected Route HOC (Higher Order Component)
function ProtectedRoute({ children, currentUser }) {
    if (!currentUser) {
        // Redirect user to the login/signup page if they are not logged in
        return <Navigate to="/auth" replace />;
    }
    // Render the intended component if the user is logged in
    return children;
}
// --- End Helper Components ---


// === Main App Component ===
function App() {
    // State Hooks
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false); // For student data loading specifically
    const [error, setError] = useState(null);     // For student data fetching errors
    const [currentUser, setCurrentUser] = useState(null); // Stores the logged-in user object or null
    const [authLoading, setAuthLoading] = useState(true); // Tracks if initial auth check is done

    // --- Effect for Firebase Auth State Listener ---
    useEffect(() => {
        setAuthLoading(true); // Start loading on mount/listener setup
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setAuthLoading(false);
            console.log("Auth State Changed:", user ? `User ID: ${user.uid}` : "No User");
        });
        return () => {
            console.log("Unsubscribing auth listener");
            unsubscribe();
        };
    }, []);

    // --- Callback for Fetching Students from Firestore ---
    const fetchStudents = useCallback(async () => {
        if (!currentUser) {
            console.log("Skipping student fetch: No user logged in.");
            setStudents([]);
            setLoading(false);
            setError(null);
            return;
        }
        console.log("Attempting to fetch students from Firestore (user logged in)...");
        setLoading(true);
        setError(null);
        const studentsCollectionRef = collection(db, "students");
        const q = query(studentsCollectionRef, orderBy("createdAt", "desc"));
        try {
            const querySnapshot = await getDocs(q);
            const studentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setStudents(studentsData);
            console.log("Students fetched successfully.");
        } catch (err) {
            console.error("Error fetching students:", err);
            if (err.code === 'permission-denied') {
                setError("You don't have permission to view student data. Please ensure you are logged in and Firestore rules are correctly set.");
            } else {
                setError("Could not load student data. Please try again later.");
            }
            setStudents([]);
        } finally {
            setLoading(false);
        }
    }, [currentUser]);

    // --- Effect to Fetch Students After Auth Check ---
    useEffect(() => {
        if (!authLoading) {
            fetchStudents();
        }
    }, [authLoading, fetchStudents]);

    // --- Callback for Adding a Student to Firestore ---
    const addStudent = useCallback(async (studentData) => {
        // Ensure user is logged in before allowing add
        if (!currentUser) {
            console.error("Attempted to add student while not logged in.");
            throw new Error("You must be logged in to register a student.");
        }

        const studentsCollectionRef = collection(db, "students");

        // --- START: Duplicate Check Logic ---
        const { name } = studentData;
        if (!name) {
             console.error("Cannot check for duplicate: 'name' field is missing in studentData.");
             throw new Error("Student name is required to check for duplicates.");
        }

        // Construct the query to find existing students with the same name
        // AND created by the current user.
        const duplicateCheckQuery = query(
            studentsCollectionRef,
            where("name", "==", name),
            // Optional: Add more 'where' clauses for a stricter check, e.g.,
            // where("dateOfBirth", "==", studentData.dateOfBirth),
            where("creatorUid", "==", currentUser.uid) // <<<--- ACTIVATED: Only check duplicates added by the same user
        );

        try {
            console.log(`Checking if user ${currentUser.uid} already registered a student named: ${name}`);
            const duplicateSnapshot = await getDocs(duplicateCheckQuery);

            if (!duplicateSnapshot.empty) {
                // A document with the same name created by this user already exists
                console.warn(`Duplicate student found for user ${currentUser.uid}:`, studentData);
                throw new Error(`You have already registered a student named "${name}".`); // Updated error message for clarity
            }
            // --- END: Duplicate Check Logic ---


            // --- If check passes, proceed to add the new document ---
            console.log("No existing student found with that name by this user. Proceeding to add new student:", studentData);
            // Add the new document with student data, creation timestamp, creator's UID, and default isSponsored
            const docRef = await addDoc(studentsCollectionRef, {
                ...studentData,             // Spread the data from the form
                createdAt: Timestamp.now(), // Add server-side timestamp
                creatorUid: currentUser.uid, // Link the document to the logged-in user
                isSponsored: false          // Explicitly set default sponsorship status
            });
            console.log("Student added successfully with ID:", docRef.id);

            // Re-fetch the student list to include the new addition
            await fetchStudents();

            return true; // Indicate success to the calling component (StudentForm)

        } catch (err) {
             // Catch errors from both the duplicate check (getDocs) and the addDoc call
             console.error("Error during add student process:", err);
             // Provide specific feedback based on potential errors
             if (err instanceof Error && err.message.includes("already registered")) { // Adjusted check for the new error message
                 // Re-throw the specific duplicate error message
                 throw err;
             } else if (err.code === 'permission-denied') {
                 throw new Error("You don't have permission to add or query students. Check Firestore rules.");
             } else {
                 // General error for adding or checking
                 throw new Error("Failed to add student. An error occurred. Please try again.");
             }
        }
    }, [currentUser, fetchStudents]); // Dependencies: Re-create if user or fetch function changes

    // --- Callback for Sponsoring a Student ---
    const handleSponsorStudent = useCallback(async (studentId) => {
        if (!currentUser) {
            console.error("Sponsor attempt failed: User not logged in.");
            alert("You must be logged in to sponsor a student.");
            return;
        }
        console.log(`Attempting to sponsor student ${studentId} by user ${currentUser.uid}`);
        const studentDocRef = doc(db, "students", studentId);
        try {
            await updateDoc(studentDocRef, {
                isSponsored: true,
                sponsoredBy: currentUser.uid,
                sponsoredAt: Timestamp.now()
            });
            console.log(`Student ${studentId} sponsored successfully.`);
            await fetchStudents();
            alert(`Thank you for sponsoring!`);
        } catch (err) {
            console.error(`Error sponsoring student ${studentId}:`, err);
            if (err.code === 'permission-denied') {
                alert("Error: You do not have permission to perform this action. Check Firestore rules.");
            } else {
                alert("An error occurred while trying to sponsor. Please try again.");
            }
        }
    }, [currentUser, fetchStudents]);

    // --- Conditional Rendering: Show Loading Indicator or App ---
    if (authLoading) {
        return <LoadingSpinner />;
    }

    // --- Render the Main Application Structure ---
    return (
        <Router>
            <div className="App">
                <Navbar currentUser={currentUser} />
                <main>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/auth"
                            element={currentUser ? <Navigate to="/" replace /> : <AuthPage />}
                        />

                        {/* Protected Routes (Require Login) */}
                        <Route
                            path="/students" // Page for registering a student
                            element={
                                <ProtectedRoute currentUser={currentUser}>
                                    {/* Pass addStudent callback to the Students page/component */}
                                    <Students onAddStudent={addStudent} currentUser={currentUser} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/sponsors" // Page for viewing students to sponsor
                            element={
                                <ProtectedRoute currentUser={currentUser}>
                                    <Sponsors
                                        students={students}
                                        loading={loading}
                                        error={error}
                                        currentUser={currentUser}
                                        onSponsor={handleSponsorStudent} // Pass the sponsor function
                                    />
                                </ProtectedRoute>
                            }
                        />

                        {/* Catch-all 404 Not Found Route */}
                        <Route path="*" element={
                            <div style={{ padding: "40px", textAlign: "center" }}>
                                <h2>404: Page Not Found</h2>
                                <p>Sorry, the page you are looking for does not exist.</p>
                                <NavLink to="/" className="empty-state-link" style={{ marginTop: '20px' }}>Go to Home</NavLink>
                            </div>
                        } />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;