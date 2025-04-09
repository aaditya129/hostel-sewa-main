import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import axios from 'axios';
import './Achievements.css';

const Achievements = () => {
  const [certificates, setCertificates] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null); // ✅ State for modal
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [isInView, setIsInView] = useState(false);

  const slidesPerPage = 4; // Number of certificates per slide
  const totalPages = Math.ceil(certificates.length / slidesPerPage);

  useEffect(() => {
    axios.get('https://hostel-sewa-node.onrender.com/api/certificates')
      .then(response => {
        setCertificates(response.data);
      })
      .catch(error => {
        console.error('Error fetching certificates:', error);
      });
  }, []);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const getCurrentSlideCertificates = () => {
    const start = currentSlide * slidesPerPage;
    const end = start + slidesPerPage;
    return certificates.slice(start, end);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      { threshold: 0.2 } 
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [controls]);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <div className="achievements-container" ref={containerRef}>
      <h2 className="achievements-title">Our Achievements</h2>
      <motion.div
        className="certificates-container"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {getCurrentSlideCertificates().map((cert) => (
          <motion.div
            className="certificate"
            key={cert._id}
            variants={cardVariants}
            onClick={() => setSelectedImage(`https://hostel-sewa-node.onrender.com/${cert.photo}`)} // ✅ Open modal on click
          >
            <img
              src={cert.photo}
              alt={cert.title}
              className="certificate-image"
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="dots-container">
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>

      {/* ✅ Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content">
            <img src={selectedImage} alt="Certificate" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievements;
