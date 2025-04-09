import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./UserBookings.css"; // ✅ Import CSS for styling
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UserBookings = () => {
  const { userId } = useParams(); // ✅ Get userId from URL
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://hostel-sewa-node.onrender.com/api/bookings/user/${userId}`)
      .then(response => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      });
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="booking-container">
        <h2>My Bookings</h2>

        {loading ? (
          <p className="loading">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="no-bookings">No bookings found.</p>
        ) : (
          <div className="booking-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <h3>{booking.hostelName}</h3>
                <p><strong>Seater:</strong> {booking.seater}</p>
                <p><strong>Tenants:</strong> {booking.numberOfTenants}</p>
                <p><strong>Length of Stay:</strong> {booking.lengthOfStay} months</p>
                <p><strong>Status:</strong> 
                  <span className={`status ${booking.status}`}>
                    {booking.status}
                  </span>
                </p>
                <p><strong>Advance Paid:</strong> Rs. {booking.advanceAmount}</p>
                {booking.paymentScreenshot && (
                  <div>
                    <p><strong>Payment Screenshot:</strong></p>
                    <img 
                      src={booking.paymentScreenshot} 
                      alt="Payment Screenshot" 
                      className="payment-image"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserBookings;
