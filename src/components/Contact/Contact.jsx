import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../Navbar';
import student from '../Contact/image.jpeg';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import Partners from '../Partners';
import Footer from '../Footer';
import './Contact.css'; // Ensure this file exists for styling

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    messageTitle: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
  
    console.log("Form Data Before Sending:", formData); // Debugging log
  
    if (!formData.fullName || !formData.email || !formData.mobileNumber || !formData.messageTitle || !formData.message) {
      setMessage('Please fill in all required fields');
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post('https://hostel-sewa-node.onrender.com/api/contacts', {
        name: formData.fullName, // Ensure correct field names
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        messageTitle: formData.messageTitle,
        message: formData.message,
      });
  
      console.log("Server Response:", response.data); // Debugging log
      setMessage(response.data.msg);
      setFormData({ fullName: '', email: '', mobileNumber: '', messageTitle: '', message: '' });
    } catch (error) {
      console.error("Error Response:", error.response?.data); // Debugging log
      setMessage(error.response?.data?.msg || 'Error submitting inquiry');
    } finally {
      setLoading(false);
    }
  };
  

  // Animation Variants
  const leftSlideVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const rightSlideVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <>
      <Navbar/>

      <motion.div className="cover-container" initial="hidden" animate="visible" transition={{ staggerChildren: 0.3 }}>
        <img className="cover-image" src={student} alt="Student Login" />

        <div className="overlay_cover">
          <div className="overlay-content">
            
            {/* Left Side - Contact Form */}
            <motion.div className="contact-form-container" variants={leftSlideVariants}>
              <h2>Contact Us</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name*"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    name="mobileNumber"
                    placeholder="Mobile Number*"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                  />
                  <select
                    name="messageTitle"
                    value={formData.messageTitle}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Message Title*</option>
                    <option value="Hostel Booking/Registration">Hostel Booking/ Registration</option>
                    <option value="Hostel Sell/Purchase">Hostel Sell/ Purchase</option>
                    <option value="Job/Staffs">Job/ Staffs</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <textarea
                  name="message"
                  placeholder="Message*"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <motion.button
                  type="submit"
                  className="submit-button"
                  disabled={loading}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: '#007bff',
                    transition: { duration: 0.3 },
                  }}
                >
                  {loading ? "Submitting..." : "Submit"}
                </motion.button>
              </form>
              {message && <p className="contact-message">{message}</p>}
            </motion.div>

            {/* Right Side - Contact Details */}
            <motion.div className="contact-details-container" variants={rightSlideVariants}>
              <h2>Hostel Sewa Pvt.Ltd</h2>
              <p><span role="img" aria-label="location">📍</span> Kumaripati, Lalitpur 44700</p>
              <p><span role="img" aria-label="email">📧</span> Hostelsewa123@gmail.com</p>
              <p><span role="img" aria-label="phone">📞</span> +977 9845567897</p>

              <h3>Follow us on social media</h3>
              <div className="social-icons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              </div>
              {/* Google Map */}
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.5254691252894!2d85.31705047546603!3d27.67014967620392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1966a997e511%3A0x22ddfa03238f7b1c!2sHostel%20Sewa%20Pvt.%20Ltd.!5e0!3m2!1sen!2sus!4v1742029647138!5m2!1sen!2sus"
                  width="100%"
                  height="200"
                  allowFullScreen=""
                  loading="lazy"
                  title="Google Map"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Partners />
      <Footer />
    </>
  );
};

export default Contact;
