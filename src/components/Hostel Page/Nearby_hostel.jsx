import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HostelCard from '../Hostel_card.jsx'; 
import './Nearby.css'
const NearbyHostel = () => {
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const res = await axios.get("https://hostel-sewa-node.onrender.com/api/hostels");
        setHostels(res.data.slice(0, 3)); // ✅ Only take first 3 hostels
      } catch (error) {
        console.error("Error fetching hostels:", error);
      }
    };

    fetchHostels();
  }, []);

  return (
    <div className="nearby-hostel-wrapper">
      <h2 className="nearby-title">Nearby Hostels</h2>
      <HostelCard hostels={hostels} />
    </div>
  );
};

export default NearbyHostel;
