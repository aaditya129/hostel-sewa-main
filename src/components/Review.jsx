import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import review from '../assets/review.jpeg';
import Navigate from './Navigate/Navigate';
import './Review.css';

const RegisterHostel = ({ register }) => {
  const controls = useAnimation();

  useEffect(() => {
    // Interval for button jump animation
    const interval = setInterval(() => {
      controls.start({
        y: -10,
        transition: { duration: 0.3, repeat: 1, repeatType: 'reverse' },
      });
    }, 2000); // Jump every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [controls]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
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
              Get your Target Hostel Online at our website by registering Here for Free!
            </p>
            <motion.button
              onClick={register}
              className="register-button"
              animate={controls}
            >
              Register Here
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navigate(RegisterHostel);
