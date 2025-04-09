// OverviewSection.js
// import React from 'react';
import React, { useEffect, useState } from 'react';
import { FaBed, FaBath, FaUserGraduate, FaHome, FaMoneyBillWave, FaBuilding,  FaPhoneAlt, FaEnvelope, FaFacebook, FaWhatsapp, FaLinkedin, FaTwitter, FaViber,FaCheckCircle } from 'react-icons/fa';
import './Hostel_Overview.css';
import axios from 'axios';
import Gallery from '../Gallery'
import Testimonial from '../Testimonial';
import Partners from '../Partners'
import Footer from '../Footer';
import Navigate from '../Navigate/Navigate';
import Hostel_individual from './Hostel_Indivudual';
import ad from './images/hostelpage_cover.jpeg'
import Hostel_book from '../Booking/Hostel_book';





const OverviewSection = ({book,hostel ,  onBookNow}) => {
  const [availableBeds, setAvailableBeds] = useState([]);
  const [adImage, setAdImage] = useState(null);
  const isLoggedIn = Boolean(localStorage.getItem("user"));

  useEffect(() => {
    const fetchAdImage = async () => {
      try {
        const res = await axios.get("https://hostel-sewa-node.onrender.com/api/ad");
        setAdImage(res.data.imageUrl);
      } catch (err) {
        console.error("Failed to fetch ad image:", err);
      }
    };
  
    fetchAdImage();
  }, []);
  

  useEffect(() => {
    const fetchAvailableBeds = async () => {
      try {
        const response = await axios.get(`https://hostel-sewa-node.onrender.com/api/available-beds/${hostel._id}`);
        setAvailableBeds(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.error("Error fetching available beds:", error);
      }
    };

    if (hostel && hostel._id) {
      fetchAvailableBeds();
    }
  }, [hostel]);
  return (

    <>

    <div className="overview-section-container">
     <div className="overview-section">
        <div className="overview-content">
          <h2 className="overview-title">Overview</h2>
          <p className="overview-description">
           {hostel.overview}
          </p>
          <div className="overview-stats">
            <div className="stat">  
              <FaHome className="stat-icon" />
              <p>Rooms: {hostel.totalRooms}</p>
            </div>
            <div className="stat">
              <FaMoneyBillWave className="stat-icon" />
              <p>Price:{hostel.price}</p>
            </div>
            <div className="stat">
              <FaBath className="stat-icon" />
              <p>Bathrooms: 6</p>
            </div>
            <div className="stat">
              <FaBuilding className="stat-icon" />
              <p>Floors: {hostel.floors}</p>
            </div>
            <div className="stat">
              <FaBed className="stat-icon" />
              <p>Beds: {hostel.beds}</p>
            </div>
            <div className="stat">
              <FaUserGraduate className="stat-icon" />
              <p>Students: {hostel.students}</p>
            </div>
          </div>

          <h2 className="features-title">Hostel Features</h2>
          <div className="features-grid">
            {hostel.features.map((feature, index) => (
              <div key={index} className="feature-item">
                <FaCheckCircle className="feature-icon" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <div className="meal-schedule">
     <h2 className="meal-title">Meal Schedule</h2>
     <p className="meal-subtitle">
       <a href="#" className="meal-link">Hygienic and Delicious Meals, Everyday</a>
     </p>

     <div className="meal-section">
       <h3 className="meal-section-title">Weekly Evening Breakfast / Khaja Menu:</h3>
       <ul className="meal-list">
         <li>Sunday: Paratha / Pasta</li>
         <li>Monday: Cheura Dalmot Mix / Chana Bhujia Fry</li>
         <li>Tuesday: Roti Tarkari / Puri Tarkari</li>
         <li>Wednesday: Wai Wai Fry / Chowmein</li>
         <li>Thursday: Samosa Aachar / Egg Chana</li>
         <li>Friday: Soup Noodles / Fried Rice</li>
         <li>Saturday: Doughnut with Milk Tea / Chatpati / Panipuri</li>
       </ul>
     </div>

     <div className="meal-section">
       <h3 className="meal-section-title">Daily Lunch and Dinner:</h3>
       <ul className="meal-list">
         <li>Standard Nepali meal served every morning and evening.</li>
       </ul>
     </div>

     <div className="meal-section">
       <h3 className="meal-section-title">Special Weekly Menu:</h3>
       <ul className="meal-list">
         <li>Chicken: Twice a week</li>
         <li>Egg Curry: Once a week</li>
         <li>Fish Curry: Once a month</li>
         <li>Vegetarian: Paneer, seasonal vegetables, milk, sweets, etc.</li>
       </ul>
     </div>
   </div>
   <div style={{marginTop: "10px"}} className="bed">
        <div className="available-beds-container">
          <h2 className="table-title">Available Beds</h2>
          <table className="available-beds-table">
            <thead>
              <tr>
                <th>Room Type</th>
                <th>Per Bed Price</th>
                <th>Available Beds</th>
              </tr>
            </thead>
            <tbody>
              {availableBeds.length > 0 ? (
                availableBeds.map((bed) => (
                  <tr key={bed._id}>
                    <td>{bed.roomType}</td>
                    <td>Rs {bed.perBedPrice}</td>
                    <td>{bed.bedsAvailable}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center' }}>No bed data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="location-map-container">  
      <h2 className="map-title"> Location</h2>
      <iframe
        title="Location Map"
        src={hostel.mapUrl}
        width="800"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>

  <div className="gap"></div>
{/* <Testimonial/> */}

    </div>
   
        </div>

        
        

        {/* Search Hostels Form */}
      <div className="search-hostel-flex">
        <div className='search-postion' >
          
        
    
        <div className="booking-info-card">
  <h2 className="booking-title">📌 Book This Hostel</h2>
  <div className="booking-detail"><strong>Name:</strong> {hostel.name}</div>
  <div className="booking-detail contact-row">
    <strong>📞 Contact:</strong>
    <span className={!isLoggedIn ? "blur-contact" : ""}>
      {hostel.contact}
    </span>
    {!isLoggedIn && (
      <span
        className="unblur-icon"
        title="Login to view contact"
        onClick={() => window.location.href = "/login/student"}
      >
        🔓
      </span>
    )}
  </div>

  <div className="booking-detail"><strong>📍 Address:</strong> {hostel.address}</div>
  <div className="booking-detail"><strong>💰 Price:</strong> Rs {hostel.price}</div>

  <button onClick={onBookNow} className="booking-button">
    📅 Book Now
  </button>
</div>


        <div className="gap"></div>
        <div style={{ marginTop: "10px" }} className="search-hostels">
  {adImage ? (
    <img
      src={adImage}
      alt="Ad Banner"
      style={{ width: "100%", borderRadius: "10px", objectFit: "cover" }}
    />
  ) : (
    <p>Loading ad...</p>
  )}
</div>

      </div>
       


{/* Hostel Information Card Below Search Hostels */}
{/* <Hostel_book hostel={hostel} /> */}

  

      </div>
      </div>
      </div>








      
   
   

    <Partners/>
    <Footer/>

  </>

  );
};

export default Navigate(OverviewSection);
