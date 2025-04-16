import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import review from '../assets/review.jpeg';
import Navigate from './Navigate/Navigate';
import './Review.css';

const RegisterHostel = () => {
  const controls = useAnimation();
  const navigate = useNavigate(); // 👈 for navigation

  useEffect(() => {
    const interval = setInterval(() => {
      controls.start({
        y: -10,
        transition: { duration: 0.3, repeat: 1, repeatType: 'reverse' },
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [controls]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="register-hostel-container"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      transition={{ duration: 0.4 }}
    >
      <div className="image-box">
        <img src={review} alt="Hostel" className="hostel-images" />
        <div className="text-overlay">
          <h2 className="overlay-title">Register a Hostel for Free?</h2>
          <p className="overlay-description">
            Get your Target Hostel Online at our website by registering here for free!
          </p>

          <div className="register-buttons-wrapper">
            <motion.button
              onClick={() => navigate('/form/staff')} // ✅ Navigate on click
              className="register-button"
              animate={controls}
            >
              Register as Staff
            </motion.button>

            <motion.button
              onClick={() => navigate('/register/student')} // optional route
              className="register-button secondary"
              animate={controls}
            >
              Register as Student
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navigate(RegisterHostel);
