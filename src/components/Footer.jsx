import React, { useEffect, useState } from 'react';
import './Footer.css';
import logo from "../assets/logo.png";
import {
  FaHome, FaHotel, FaUserAlt,
  FaFacebook, FaTwitter, FaInstagram, FaGoogle
} from 'react-icons/fa';
import axios from 'axios';

const Footer = () => {
  const [contact, setContact] = useState({
    address: '',
    phoneNumber: '',
    email: '',
    facebook: '',
    twitter: '',
    instagram: '',
    google: ''
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get('https://hostel-sewa-node.onrender.com/api/contact-info');
        if (res.data) setContact(res.data);
      } catch (err) {
        console.error('Failed to fetch contact info:', err);
      }
    };

    fetchContact();
  }, []);

  return (
    <>
      <footer className="footer">
        {/* Contact Info */}
        <div className="footer_one">
          <img src={logo} alt="Logo" className="logo_footer" />
          <ul>
            <li><FaHome className="icon" /> {contact.address}</li>
            <li><FaHotel className="icon" /> {contact.phoneNumber}</li>
            <li><FaUserAlt className="icon" /> {contact.email}</li>
          </ul>
        </div>

        <div className="vertical_line"></div>

        {/* Social Media */}
        <div className="footer_two">
          <p className='follow'>Follow Us</p>
          <p>Providing detailed information about premium <br /> hostels around Nepal.</p>
          <div className="social_icons">
            {contact.facebook && (
              <a href={contact.facebook} target="_blank" rel="noreferrer">
                <FaFacebook className="social_icon" />
              </a>
            )}
            {contact.twitter && (
              <a href={contact.twitter} target="_blank" rel="noreferrer">
                <FaTwitter className="social_icon" />
              </a>
            )}
            {contact.instagram && (
              <a href={contact.instagram} target="_blank" rel="noreferrer">
                <FaInstagram className="social_icon" />
              </a>
            )}
            {contact.google && (
              <a href={contact.google} target="_blank" rel="noreferrer">
                <FaGoogle className="social_icon" />
              </a>
            )}
          </div>
        </div>

        <div className="vertical_line"></div>

        {/* Newsletter */}
        <div className="footer_three">
          <p className='newsletter_heading'>Our Newsletter</p>
          <form action="">
            <input type="email" placeholder="Email" aria-label="Email" required />
          </form>
          <button type="submit" className="subscribe_button">Subscribe</button>
        </div>
      </footer>

      <section className="footer_bottom">
        <p>Hostel Sewa 2024. Designed by Ashim K & Developed by DS</p>
        <p>
          <u>Privacy Policy</u> <br /> <u>Terms and Conditions</u>
        </p>
      </section>
    </>
  );
};

export default Footer;
