// src/Pages/Home.js

import React from 'react';

function Home() {
  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1>Welcome to SponsorED</h1>
      <p style={{ fontSize: "1.2rem", color: "#555" }}>
        Connecting generous sponsors with bright students who need a helping hand to pursue their education.
      </p>
      <hr style={{ margin: "30px 0", borderColor: "#eee" }} />
      <div>
        <h2>How it Works</h2>
        <p>
          Students can register their needs, and potential sponsors can browse profiles to find someone they'd like to support.
        </p>
        {/* You can add more descriptive text or images here later */}
      </div>
    </div>
  );
}

export default Home;