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
// src/App.js
// src/App.js
// ... (imports and state management code from before) ...

// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'; // Ensure correct path
import Home from './Pages/Home';          // Ensure correct path & capitalization
import Students from './Pages/Students';    // Ensure correct path & capitalization
import Sponsors from './Pages/Sponsors';    // Ensure correct path & capitalization

function App() {
  const [students, setStudents] = useState([]);

  const addStudent = (studentData) => {
    const newStudent = { ...studentData, id: Date.now() };
    setStudents(prevStudents => [...prevStudents, newStudent]);
    console.log("Updated Students List:", [...students, newStudent]);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<Students onAddStudent={addStudent} />} />
            {/* Remove the comment from inside this tag */}
            <Route
              path="/sponsors"
              element={<Sponsors students={students} />}
            />
            <Route path="*" element={ <div style={{ padding: "20px" }}><h2>404: Page Not Found</h2></div> } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;