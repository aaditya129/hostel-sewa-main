import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hostel_card.css';
import hostelImage from '../assets/Hostel_card.png';
import axios from 'axios';

const HostelCard = ({ hostels = [] }) => {
  const navigate = useNavigate();
  const [coverPhotos, setCoverPhotos] = useState({});
  const [visibleCount, setVisibleCount] = useState(6); // Default for desktop

  const isLoggedIn = Boolean(localStorage.getItem("user"));

  // Detect mobile view
  const isMobile = window.innerWidth < 768;
  const INITIAL_COUNT = isMobile ? 3 : 6; // Mobile: 3, Desktop: 6

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
              photosData[hostel._id] = hostelImage;
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

  // Reset visibleCount when switching between mobile and desktop
  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [isMobile, hostels]);

  const handleCardClick = (hostelId) => {
    navigate(`/hostel_details/${hostelId}`);
  };

  const handleSeeMore = () => {
    setVisibleCount((prev) => Math.min(prev + INITIAL_COUNT, hostels.length));
  };

  const handleSeeLess = () => {
    setVisibleCount(INITIAL_COUNT);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Optional smooth scroll
  };

  if (!hostels || hostels.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>No hostels available.</p>;
  }

  return (
    <div>
      <div className="hostel-card-container">
        {hostels.slice(0, visibleCount).map((hostel) => (
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

      {/* Buttons */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {visibleCount < hostels.length && (
          <button className="see-more-button" onClick={handleSeeMore}>
            See More
          </button>
        )}
        {visibleCount > INITIAL_COUNT && (
          <button className="see-less-button" onClick={handleSeeLess}>
            See Less
          </button>
        )}
      </div>
    </div>
  );
};

export default HostelCard;
