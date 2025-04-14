// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
// --- React Router Imports Grouped Together ---
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate, // Moved to top
    NavLink   // Moved to top
} from 'react-router-dom';
// --- End React Router Imports ---

import './App.css'; // Basic App styles

// --- Firebase Imports ---
import { db, auth, app } from './firebase'; // Ensure app is exported from firebase.js
import {
    collection,
    getDocs,
    addDoc,
    query,
    orderBy,
    Timestamp,
    // where // Import 'where' if you plan to use it in queries later
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


// --- Helper Components Defined within App.js (or import if separate) ---

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
        // 'replace' prevents the user from going back to the protected route via browser back button
        return <Navigate to="/auth" replace />;
    }
    // Render the intended component if the user is logged in
    return children;
}

// Placeholder pages (replace with actual imports if you create separate files)
const SignUpPage = () => <h2>Sign Up Page - Add SignUpForm here</h2>;
const LoginPage = () => <h2>Login Page - Add LoginForm here</h2>;
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
        // onAuthStateChanged returns an unsubscribe function
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);     // Update state with user object or null
            setAuthLoading(false);    // Auth check complete
            console.log("Auth State Changed:", user ? `User ID: ${user.uid}` : "No User");
        });

        // Cleanup function: Unsubscribe from the listener when the component unmounts
        return () => {
            console.log("Unsubscribing auth listener");
            unsubscribe();
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    // --- Callback for Fetching Students from Firestore ---
    const fetchStudents = useCallback(async () => {
        // Prevent fetching if not logged in
        if (!currentUser) {
            console.log("Skipping student fetch: No user logged in.");
            setStudents([]); // Clear data if logged out
            setLoading(false);
            setError(null); // Clear previous errors
            return;
        }

        console.log("Attempting to fetch students from Firestore (user logged in)...");
        setLoading(true); // Indicate start of data fetching
        setError(null);   // Clear previous errors

        const studentsCollectionRef = collection(db, "students");
        // Query to get students, ordered by creation time (newest first)
        const q = query(studentsCollectionRef, orderBy("createdAt", "desc"));

        try {
            const querySnapshot = await getDocs(q); // Fetch documents
            // Map Firestore docs to plain JS objects including the document ID
            const studentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setStudents(studentsData); // Update state with fetched data
            console.log("Students fetched successfully.");
        } catch (err) {
            console.error("Error fetching students:", err);
            // Provide specific feedback based on potential errors
            if (err.code === 'permission-denied') {
                setError("You don't have permission to view student data. Please ensure you are logged in and Firestore rules are correctly set.");
            } else {
                setError("Could not load student data. Please try again later.");
            }
            setStudents([]); // Clear data on error
        } finally {
            setLoading(false); // Indicate end of data fetching
        }
    }, [currentUser]); // Dependency: Re-create fetch function if currentUser changes

    // --- Effect to Fetch Students After Auth Check ---
    useEffect(() => {
        // Only fetch data *after* the initial authentication check is complete
        if (!authLoading) {
            fetchStudents();
        }
    }, [authLoading, fetchStudents]); // Dependencies: Run when auth check finishes or fetchStudents updates

    // --- Callback for Adding a Student to Firestore ---
    const addStudent = useCallback(async (studentData) => {
        // Ensure user is logged in before allowing add
        if (!currentUser) {
            console.error("Attempted to add student while not logged in.");
            throw new Error("You must be logged in to register a student.");
        }

        console.log("Attempting to add student:", studentData);
        const studentsCollectionRef = collection(db, "students");

        try {
            // Add the new document with student data, creation timestamp, and creator's UID
            const docRef = await addDoc(studentsCollectionRef, {
                ...studentData,             // Spread the data from the form
                createdAt: Timestamp.now(), // Add server-side timestamp
                creatorUid: currentUser.uid // Link the document to the logged-in user
            });
            console.log("Student added successfully with ID:", docRef.id);

            // Re-fetch the student list to include the new addition
            // Note: For better performance with many users, consider Firestore listeners or optimistic updates
            await fetchStudents();

            return true; // Indicate success to the calling component (StudentForm)

        } catch (err) {
            console.error("Error adding student:", err);
            // Provide specific feedback based on potential errors
            if (err.code === 'permission-denied') {
                throw new Error("You don't have permission to add students. Check Firestore rules.");
            } else {
                throw new Error("Failed to add student. Please try again.");
            }
        }
    }, [currentUser, fetchStudents]); // Dependencies: Re-create if user or fetch function changes

    // --- Conditional Rendering: Show Loading Indicator or App ---
    if (authLoading) {
        // Display a loading state while the initial auth check is running
        return <LoadingSpinner />;
    }

    // --- Render the Main Application Structure ---
    return (
        <Router>
            <div className="App">
                {/* Pass the current user state to the Navbar */}
                <Navbar currentUser={currentUser} />
                <main>
                    {/* Define Application Routes */}
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/auth"
                            // If user is logged in, redirect from /auth to home, otherwise show AuthPage
                            element={currentUser ? <Navigate to="/" replace /> : <AuthPage />}
                        />

                        {/* Protected Routes (Require Login) */}
                        <Route
                            path="/students" // Page for registering a student
                            element={
                                <ProtectedRoute currentUser={currentUser}>
                                    <Students onAddStudent={addStudent} currentUser={currentUser} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/sponsors" // Page for viewing students to sponsor
                            element={
                                <ProtectedRoute currentUser={currentUser}>
                                    <Sponsors students={students} loading={loading} error={error} currentUser={currentUser} />
                                </ProtectedRoute>
                            }
                        />

                        {/* Catch-all 404 Not Found Route */}
                        <Route path="*" element={
                            <div style={{ padding: "40px", textAlign: "center" }}>
                                <h2>404: Page Not Found</h2>
                                <p>Sorry, the page you are looking for does not exist.</p>
                                {/* Use NavLink for styling consistency if needed */}
                                <NavLink to="/" className="empty-state-link" style={{ marginTop: '20px' }}>Go to Home</NavLink>
                            </div>
                        } />
                    </Routes>
                </main>
                {/* Optional Footer could go here */}
            </div>
        </Router>
    );
}

export default App;