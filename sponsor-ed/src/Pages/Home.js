// src/Pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for buttons
import './Home.css'; // Import the CSS file for styling

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to SponsorED</h1>
          <p className="tagline">
            Connecting generous sponsors with bright students who need a helping hand
            to pursue their education. Let's build futures together.
          </p>
          <div className="cta-buttons">
            {/* Link to Student Registration Page */}
            <Link to="/students" className="cta-button primary">
              Register as Student <i className="fa-solid fa-user-graduate"></i>
            </Link>
            {/* Link to Sponsors/Browse Page */}
            <Link to="/sponsors" className="cta-button secondary">
              Sponsor a Student <i className="fa-solid fa-magnifying-glass-dollar"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps-container">
          {/* Step 1 Card */}
          <div className="step-card">
             <i className="fas fa-user-plus step-icon"></i> {/* Registration Icon */}
            <h3>1. Students Register</h3>
            <p>Students needing support create a profile outlining their educational goals and financial requirements.</p>
          </div>

          {/* Step 2 Card */}
          <div className="step-card">
            <i className="fas fa-search-dollar step-icon"></i> {/* Browsing/Finding Icon */}
            <h3>2. Sponsors Browse</h3>
            <p>Kind-hearted sponsors explore verified student profiles to find someone whose journey resonates with them.</p>
          </div>

          {/* Step 3 Card */}
          <div className="step-card">
            <i className="fas fa-handshake-angle step-icon"></i> {/* Connection/Support Icon */}
            <h3>3. Make an Impact</h3>
            <p>Sponsors choose a student and contribute directly towards their education, making a tangible difference.</p>
          </div>
        </div>
      </section>

      {/* Potential Future Sections:
        <section className="testimonials-section">...</section>
        <section className="stats-section">...</section>
      */}
    </div>
  );
}

export default Home;