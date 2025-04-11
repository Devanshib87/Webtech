// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import './App.css';
import Navbar from './components/Navbar'; // Correct path if needed: './Components/Navbar'
import Home from './Pages/Home';
import Students from './Pages/Students';
import Sponsors from './Pages/Sponsors'; // Import the new Sponsors page

function App() {
  return (
    // 1. Wrap everything in Router
    <Router>
      <div className="App">
        <Navbar /> {/* Navbar stays outside Routes to be on every page */}
        <main> {/* Optional: wrap routes in main for semantic HTML */}
          {/* 2. Define the Routes */}
          <Routes>
            {/* Route for the Home page */}
            <Route path="/" element={<Home />} />

            {/* Route for the Students page (form) */}
            <Route path="/students" element={<Students />} />

            {/* Route for the Sponsors page */}
            <Route path="/sponsors" element={<Sponsors />} />

            {/* Optional: Add a catch-all route for 404 Not Found */}
            <Route path="*" element={
              <div style={{ padding: "20px" }}>
                <h2>404: Page Not Found</h2>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;