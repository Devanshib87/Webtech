// src/Pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for buttons
import './Home.css'; // We will create this CSS file

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to SponsorED</h1>
          <p className="tagline">
            Connecting generous sponsors with bright students who need a helping hand to pursue their education.
          </p>
          <div className="cta-buttons">
            <Link to="/students" className="cta-button primary">
              Register as Student <i className="fa-solid fa-user-graduate"></i>
            </Link>
            <Link to="/sponsors" className="cta-button secondary">
              Browse Students <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps-container">
          {/* Step 1 */}
          <div className="step-card">
             <i className="fas fa-user-plus step-icon"></i>
            <h3>1. Students Register</h3>
            <p>Students in need create a profile detailing their educational goals and financial requirements.</p>
          </div>
          {/* Step 2 */}
          <div className="step-card">
            <i className="fas fa-search-dollar step-icon"></i>
            <h3>2. Sponsors Browse</h3>
            <p>Kind-hearted sponsors browse student profiles to find someone they wish to support.</p>
          </div>
          {/* Step 3 */}
          <div className="step-card">
            <i className="fas fa-handshake-angle step-icon"></i>
            <h3>3. Make a Connection</h3>
            <p>Sponsors select a student and contribute towards their education, making a direct impact.</p>
          </div>
        </div>
      </section>

      {/* Optional: Add more sections like testimonials, stats, partners etc. */}

    </div>
  );
}

export default Home;