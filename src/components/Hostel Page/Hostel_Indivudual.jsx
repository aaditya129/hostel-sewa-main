import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Hostel_individual.css";
import Navbar from "../Navbar";
import Hostel_Slider from "./Hostel_slider";
import Hostel_Overview from "./Hostel_Overview";
import { FaUnlockAlt } from "react-icons/fa";


const API_URL = import.meta.env.VITE_API_URL || "https://hostel-sewa-node.onrender.com"; // ✅ Fix: Use `import.meta.env`


const Hostel_individual = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hostel, setHostel] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bankQrUrl, setBankQrUrl] = useState(null);
  const [esewaQrUrl, setEsewaQrUrl] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);
  const isLoggedIn = Boolean(localStorage.getItem("user"));
  const [bookingDetails, setBookingDetails] = useState({
    seater: "Single",
    numberOfTenants: 1,
    lengthOfStay: "1", // ✅ Default to 1 month
    fullName: "",
    address: "",
    mobileNumber: "",
    emailAddress: "",
    paymentOption: "bank",
    paymentScreenshot: null,
    advanceAmount: "0", // ✅ Default to 0
  });


  useEffect(() => {
    const fetchHostelDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/hostel/${id}`);
        console.log(response)
        setHostel(response.data.hostel);
      } catch (err) {
        setError("Hostel not found");
      } finally {
        setLoading(false);
      }
    };
    const fetchHostelPhotos = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/hostel-photos/${id}`);
        setPhotos(response.data.photos); // ✅ Only multiple photos
      } catch (err) {
        console.error("❌ Error fetching photos:", err);
        setPhotos([]); // Fallback to empty
      }
    };

    fetchHostelDetails();
    fetchHostelPhotos();
    setLoading(false);

    // fetchHostelDetails();
  }, [id]);

  useEffect(() => {
    // fetch hostel & photos...

    const fetchQRCodes = async () => {
      try {
        const bankRes = await axios.get(`${API_URL}/api/qr/bank`);
        const esewaRes = await axios.get(`${API_URL}/api/qr/esewa`);
        setBankQrUrl(bankRes.data.bankQr);
        setEsewaQrUrl(esewaRes.data.esewaQr);
      } catch (err) {
        console.error("QR Fetch failed:", err);
      }
    };

    fetchQRCodes();
  }, [id]);



  // ✅ Ensure the user is logged in before booking
  const handleBookNow = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to book a hostel.");
      navigate("/login/student");
      return;
    }

    try {
      // Fetch user data using their ID from localStorage
      const userId = localStorage.getItem("user");
      const response = await axios.get(`${API_URL}/api/auth/userdetails/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = response.data.user;
      console.log(response.data.user)

      // Update booking details with user data
      setBookingDetails(prev => ({
        ...prev,
        fullName: userData.fullName || "",
        address: userData.address || "",
        mobileNumber: userData.mobileNumber || "",
        emailAddress: userData.email || "",
      }));

      setShowBookingForm(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Failed to load your profile information. Please try again.");
    }
  };

  const handleCloseForm = () => setShowBookingForm(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({ ...bookingDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length === 0) {
      alert("Please select a payment screenshot.");
      return;
    }

    setBookingDetails({
      ...bookingDetails,
      paymentScreenshot: e.target.files[0],
    });

    console.log("Selected File:", e.target.files[0]); // ✅ Debug file upload
  };


  const handleSubmitBooking = async (e) => {
    e.preventDefault();

    const handleSubmitBooking = (e) => {
      e.preventDefault();
      setSubmitAttempted(true);
    
      if (!acceptedTerms) {
        return; // Stop form submission if terms not accepted
      }
    
      // Proceed with booking logic here
    };
    

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to continue.");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    Object.keys(bookingDetails).forEach((key) => {
      formData.append(key, bookingDetails[key]);
    });

    formData.append("hostelName", hostel.name);
    formData.append("userId", localStorage.getItem("user")); // ✅ Ensure userId is sent

    // ✅ Debugging: Log form data before sending
    console.log("Booking Data Sent:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": ", pair[1]);
    }

    try {
      const response = await axios.post(`${API_URL}/api/bookings`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // ✅ Send auth token
        },
      });

      setShowBookingForm(false);
      setBookingDone(true);
      setTimeout(() => setBookingDone(false), 3000);
    } catch (error) {
      console.error("Booking failed:", error.response?.data);
      alert(`Booking failed: ${error.response?.data?.msg || "Please try again."}`);
    }
  };




  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error || !hostel) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <>
      <Navbar />
      {/* <Hostel_Slider /> */}
      {
        photos && photos.length &&
      <Hostel_Slider images={photos.length > 0 ? photos : []} />
      }
      <div className="hostel-details">
        {hostel.image && <img src={hostel.image} className="hostel-logo" alt={hostel.name} />}
        <h2>
          {hostel.name} <span className="rating">★ {hostel.rating}</span>
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  <p className={!isLoggedIn ? "blur-contact" : ""}>
    📞 {hostel.contact}
  </p>
  {!isLoggedIn && (
    <span
      className="unblur-icon"
      title="Login to view contact"
      onClick={() => navigate("/login/student")}
    >
      🔓
    </span>
  )}
</div>


        <p>📍 {hostel.address}</p>
        <p>💲 {hostel.price}</p>
        <button className="book-hostel-button" onClick={handleBookNow}>
          📅 Book Hostel
        </button>
      </div>

      {showBookingForm && (
        <div className="booking-form-overlay">
          <div className="booking-form">
            <span className="close-icon" onClick={handleCloseForm}>✖</span>
            <h2>Book {hostel.name}</h2>
            <form onSubmit={handleSubmitBooking}>
              <label>Room Type:</label>
              <select name="seater" value={bookingDetails.seater} onChange={handleInputChange} required>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Triple Sharing">Triple Sharing</option>
              </select>

              <label>Number of Tenants:</label>
              <input type="number" name="numberOfTenants" value={bookingDetails.numberOfTenants} onChange={handleInputChange} required />

              <label>Full Name:</label>
              <input type="text" name="fullName" value={bookingDetails.fullName} onChange={handleInputChange} required />

              <label>Address:</label>
              <input type="text" name="address" value={bookingDetails.address} onChange={handleInputChange} required />

              <label>Mobile Number:</label>
              <input type="text" name="mobileNumber" value={bookingDetails.mobileNumber} onChange={handleInputChange} required />

              <label>Email Address:</label>
              <input type="email" name="emailAddress" value={bookingDetails.emailAddress} onChange={handleInputChange} required />

              <label>Payment Option:</label>
              <select name="paymentOption" value={bookingDetails.paymentOption} onChange={handleInputChange} required>
                <option value="bank">Bank</option>
                <option value="esewa">eSewa</option>
              </select>
              {bookingDetails.paymentOption === "bank" && bankQrUrl && (
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                  <p><strong>Scan Bank QR:</strong></p>
                  <img src={bankQrUrl} alt="Bank QR" style={{ width: "200px", borderRadius: "8px" }} />
                </div>
              )}

              {bookingDetails.paymentOption === "esewa" && esewaQrUrl && (
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                  <p><strong>Scan eSewa QR:</strong></p>
                  <img src={esewaQrUrl} alt="eSewa QR" style={{ width: "200px", borderRadius: "8px" }} />
                </div>
              )}

              <label>Payment Screenshot:</label>
              <input type="file" name="paymentScreenshot" onChange={handleFileChange} required />

              <label>Advance Amount Paid:</label>
              <input type="number" name="advanceAmount" value={bookingDetails.advanceAmount} onChange={handleInputChange} required />

              <div style={{ marginTop: "10px" , display: "flex" ,  }}>
                <input
                  type="checkbox"
                  id="terms"
                  style={{width: "20px"}}
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <label htmlFor="terms" style={{ marginLeft: "8px" }}>
                  I accept the <a href="/terms" target="_blank">Terms and Conditions</a>
                </label>
              </div>
              {submitAttempted && !acceptedTerms && (
  <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
    Please accept the Terms and Conditions to proceed with the booking.
  </p>
)}


              <button type="submit"  disabled={!acceptedTerms} className="submit-booking-button">Confirm Booking</button>
            </form>
          </div>
        </div>
      )}

      {bookingDone && (
        <div className="booking-success">
          <div className="checkmark">✔</div>
          <p>Booking Confirmed!</p>
        </div>
      )}

      <Hostel_Overview hostel={hostel} onBookNow={handleBookNow} />
    </>
  );
};

export default Hostel_individual;
