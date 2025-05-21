// src/components/StoreHeader.jsx
import React from 'react';
import './StoreHeader.css'; // Import the corresponding CSS file
import logo from '../../assets/logo.png' // <<<<<<< IMPORTANT: REPLACE WITH YOUR ACTUAL LOGO PATH

const StoreHeader = () => {
  return (
    <div className="store-header-container">
      <div className="orange-triangle">
        <img src={logo} alt="Store Logo" className="store-logo" />
        {/* Combined WELCOME TO and OUR STORE into a single H2 */}
        <h2 className="store-title">
          <span style={{ color: 'white' }}>WELCOME TO</span><br />
          OUR STORE
        </h2>
        <p className="tagline">“A Complete Solutions</p>
        <p className="tagline">For Hostelers.”</p>
      </div>
    </div>
  );
};

export default StoreHeader;