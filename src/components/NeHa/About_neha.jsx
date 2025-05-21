import Navbar from '../Navbar';
import Partners from '../Partners';
import Footer from '../Footer';
import React, { useState } from 'react';
import './About_neha.css';
import sosImg from './sos.jpg';

import logo from '../../assets/logo.png' 
const sosData = [
  { title: 'Nepal Hostel Association', img: sosImg },
  { title: 'Hostel Bebasai Sangh', img: sosImg },
  { title: 'Police Station', img: sosImg },
  { title: 'Hospitals', img: sosImg },
  { title: 'Ambulance', img: sosImg },
  { title: 'Water Tank', img: sosImg },
  { title: 'Electricity', img: sosImg },
  { title: 'Colleges', img: sosImg },
  { title: 'Gas', img: sosImg },
  { title: 'Water Bottle', img: sosImg },

];

const SosPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = sosData.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
<div className="store-header-container">
      <div className="orange-triangle">
        <img src={logo} alt="Store Logo" className="store-logo" />
        {/* Changed content to "SOS" */}
        <h2 className="store-title">SOS</h2>
        {/* Changed content to "A complete solution for Hostelers" */}
        <p className="tagline">A complete solution for Hostelers</p>
      </div>
    </div>
      <div className="sos-main">
        <h2 className="sos-heading">
          Here is many types of contact number. You can search and call directly what you want.
        </h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="gif-banner">GIF Format Add</div>

        <div className="sos-grid">
          {filteredData.map((item, index) => (
            <div className="sos-card" key={index}>
              <img src={item.img} alt={item.title} />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="sos-video-section">
  <h3>Watch This Useful Video</h3>
  <div className="video-container">
    <iframe
      src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
      title="YouTube video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
</div>

      <Partners />
      <Footer />
    </>
  );
};

export default SosPage;
