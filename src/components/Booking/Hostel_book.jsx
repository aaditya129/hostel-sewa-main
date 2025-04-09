// Hostel_book.jsx
import React from 'react';
import '../Hostel Page/Hostel_Overview.css';
import { FaBed, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaFacebook, FaWhatsapp, FaLinkedin, FaTwitter, FaViber } from 'react-icons/fa';
import Hostel_individual from '../Hostel Page/Hostel_Indivudual';
import { useParams } from 'react-router-dom';
import Navigate from '../Navigate/Navigate';

const Hostel_book = ({ book}) => {
    const { id } = useParams();
  const hostels = [
    {
      id: 1,
      name: "Subha Boy’s Hostel",
      location: "Sankhamul, Kathmandu",
      price: "Rs 10,000",
      contact: "9845034555, 9855023457",
      rating: 5.0,
 
      totalBeds: 30,
      availableBeds: 17,
      type: "Boys Hostel",
      email: "example@example.com",
      facebookLink: "https://facebook.com"
    },
    {
      id: 2,
      name: "Shree Girls' Hostel",
      location: "Koteshwor, Kathmandu",
      price: "Rs 8,500",
      contact: "9841234567, 9847654321",
      rating: 4.1,

      totalBeds: 25,
      availableBeds: 15,
      type: "Girls Hostel",
      email: "example@example.com",
      facebookLink: "https://facebook.com"
    },
    {
        id: 3,
        name: "Bright Hostel",
        location: "Lalitpur",
        price: "Rs 9,200",
        contact: "9851231234, 9856543210",
        rating: 4.8,
  
      }
    // Add more hostels as needed
  ];

  const hostel = hostels.find((hostel) => hostel.id === Number(id));

  if (!hostel) {
    return <p>Hostel not found</p>;
  }
  return (
    <>
    
    <div className="hostel-info-card">
    
      <h2 className="hostel-name">{hostel.name}</h2>
      <div className="info-item">
        <FaMapMarkerAlt className="info-icon" />
        <span>{hostel.type || 'Hostel'}</span>
      </div>
      <div className="info-item">
        <FaPhoneAlt className="info-icon" />
        <span>{hostel.contact || 'No contact provided'}</span>
      </div>
      <div className="info-item">
        <FaEnvelope className="info-icon" />
        <span>{hostel.email || 'No email provided'}</span>
      </div>
      <div className="info-item">
        <FaFacebook className="info-icon" />
        <a href={hostel.facebookLink || '#'} className="info-link">Facebook Page</a>
      </div>
      <div className="info-item">
        <FaBed className="info-icon" />
        <span>{hostel.totalBeds} (Total Beds)</span>
      </div>
      <div className="info-item">
        <FaBed className="info-icon" />
        <span>{hostel.availableBeds} (Available Beds)</span>
      </div>
      <div className="button-group">
        <button className="inquiry-button">Inquiry Now</button>
        <button onClick={book} className="book-button">Book Now</button>
      </div>
      <div className="share-section">
        <p>Share your hostel on:</p>
        <div className="social-icons">
          <FaFacebook className="social-icon" />
          <FaTwitter className="social-icon" />
          <FaLinkedin className="social-icon" />
          <FaWhatsapp className="social-icon" />
          <FaViber className="social-icon" />
        </div>
      </div>
    </div>
    </>
  );
};

export default Navigate(Hostel_book);
