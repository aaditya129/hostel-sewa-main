import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaHotel,
  FaUserAlt,
  FaBlogger,
  FaBoxOpen,
  FaInfoCircle,
  FaPhoneAlt,
  FaBars,
  FaUserCircle,
} from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import axios from "axios"; // Import Axios for API calls
import "./Navbar.css";
import logo from "../assets/logo.png";
import InquiryModal from "./InquiryModal";
import Navigate from "./Navigate/Navigate";
import { useNavigate } from "react-router-dom";


const Navbar = ({
  register,
  hostelClick,
  login,
  home,
  neha,
  gallery,
  blog,
  about,
  form,
  contact,
  store,
  form_staff,
}) => {
  const navigate = useNavigate(); // ✅ Initialize navigate function

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const hosteluser = localStorage.getItem("currentUser");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user"); // Retrieve _id from localStorage
    console.log(hosteluser)
    if (token && userId) {
      setIsLoggedIn(true);

      // Fetch user details
      axios
        .get(`https://hostel-sewa-node.onrender.com/api/auth/userdetails/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }, // Include token for secure routes
        })
        .then((response) => {
          console.log(response.data.user)
          setUserName(response.data.user); // Set the real name
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const ownerData = localStorage.getItem("currentUser");
  
    if (token && ownerData) {
      setIsLoggedIn(true);
      setUserName(JSON.parse(ownerData)); // hostel owner info
    }
  }, []);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 1000); // Jump for 1 second
    }, 5000); // Every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setShowLogout(false);
    window.location.reload(); // Refresh the page
  };

  return (
    <>
      <nav className="navbar">
        <img src={logo} alt="Logo" className="logo" />
        <div className="menu-icon" onClick={toggleMobileMenu}>
          <FaBars />
        </div>

        <ul className={`navbar-list ${isMobileMenuOpen ? "show-menu" : ""}`}>
          <li onClick={home}>
            <FaHome className="icon2" />
            Home
          </li>
          <li onClick={hostelClick}>
            <FaHotel className="icon2" />
            Hostel
          </li>
          <li onClick={neha}>
            <FaUserAlt className="icon2" />
            NeHa
          </li>
          <li onClick={gallery}>
            <FaImage className="icon2" />
            Gallery
          </li>
          <li onClick={blog}>
            <FaBlogger className="icon2" />
            Blogs
          </li>
          <li onClick={store}>
            <FaBoxOpen className="icon2" />
            Products
          </li>
          <li onClick={about}>  
            <FaInfoCircle className="icon2" />
            About Us
          </li>
          <li onClick={contact}>
            <FaPhoneAlt className="icon2" />
            Contact Us
          </li>
          {isLoggedIn  ? (
  <li
  onClick={() => setShowLogout(!showLogout)}
  className={`user-profile ${isMobileMenuOpen ? "mobile-profile" : ""}`}
  style={{ position: "relative" }}
>
  <img src={userName.profilePicture} alt="" />
  {userName.fullName}

  <div className={`dropdown-container ${showLogout ? "show" : ""}`}>
    <div className="dropdown-menu">
      <button className="dropdown-item" onClick={() => navigate(`/bookings/${userName._id}`)}>
        My Bookings
      </button>
      <button className="dropdown-item" onClick={handleLogout}>Logout</button>
    </div>
  </div>
</li>

) : (
  <>
    <li onClick={login} className="user-login">User Login</li>
    <li onClick={form_staff} className="user-login">Forms</li>
  </>
)}
  

        </ul>
        {localStorage.getItem("currentUser") ? (
  <button
    onClick={() => navigate("/register-hostel")}
    className={`inquiry ${isJumping ? "jump" : ""}`}
  >
    Register Hostel
  </button>
) : (
  <button
    onClick={openModal}
    className={`inquiry ${isJumping ? "jump" : ""}`}
  >
    Inquiry Now
  </button>
)}

        <InquiryModal isOpen={isModalOpen} onClose={closeModal} />
      </nav>
    </>
  );
};

// Wrap the Navbar component with Navigate and export
export default Navigate(Navbar);
