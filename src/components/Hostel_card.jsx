import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hostel_card.css';
import hostelImage from '../assets/Hostel_card.png';
import axios from 'axios';

const HostelCard = ({ hostels = [] }) => {
  const navigate = useNavigate();
  const [coverPhotos, setCoverPhotos] = useState({}); // Store cover photos for each hostel

  const isLoggedIn = Boolean(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCoverPhotos = async () => {
      try {
        const photosData = {};
        await Promise.all(
          hostels.map(async (hostel) => {
            try {
              const response = await axios.get(`https://hostel-sewa-node.onrender.com/api/hostel-photos/${hostel._id}`);
              photosData[hostel._id] = response.data.coverPhoto ? response.data.coverPhoto : hostelImage;
            } catch (error) {
              console.error(`❌ Error fetching cover photo for ${hostel.name}:`, error);
              photosData[hostel._id] = hostelImage; // Default if error occurs
            }
          })
        );
        setCoverPhotos(photosData);
      } catch (error) {
        console.error("❌ Error fetching cover photos:", error);
      }
    };

    if (hostels.length > 0) {
      fetchCoverPhotos();
    }
  }, [hostels]);

  const handleCardClick = (hostelId) => {
    navigate(`/hostel_details/${hostelId}`);
  };

  if (!hostels || hostels.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>No hostels available.</p>;
  }

  return (
    <div className="hostel-card-container">
      {hostels.map((hostel) => (
        <div className="hostel-card" key={hostel._id} onClick={() => handleCardClick(hostel._id)}>
          <div className="image-container">
            <img src={coverPhotos[hostel._id] || hostelImage} alt={hostel.name} className="hostel-image" />
            <div className="price-badge">Rs {hostel.price}</div>
          </div>
          <div className="hostel-info">
            <h3>{hostel.name}</h3>
            <p className="location">📍 {hostel.address}</p>
            <div className={isLoggedIn ? "contact" : "contact blur-contact"}>
              📞 {hostel.contact}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HostelCard;
