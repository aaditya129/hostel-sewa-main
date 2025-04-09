import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './Achievements.css';

const Achievements = () => {
  const [certificates, setCertificates] = useState([
    {
      _id: '1',
      title: 'Certificate of Excellence',
   photo: 'https://m.media-amazon.com/images/I/71eGdf7X3rL._AC_UF894,1000_QL80_.jpg',
    },
    {
      _id: '2',
      title: 'Outstanding Performance',
      photo: 'https://m.media-amazon.com/images/I/71eGdf7X3rL._AC_UF894,1000_QL80_.jpg',
    },
    {
      _id: '3',
      title: 'Achievement Award',
  photo: 'https://m.media-amazon.com/images/I/71eGdf7X3rL._AC_UF894,1000_QL80_.jpg',
    },
    {
      _id: '4',
      title: 'Best Service',
     photo: 'https://m.media-amazon.com/images/I/71eGdf7X3rL._AC_UF894,1000_QL80_.jpg',
    },
  ]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [isInView, setIsInView] = useState(false);

  const slidesPerPage = 4;
  const totalPages = Math.ceil(certificates.length / slidesPerPage);

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
        staggerChildren: 0.2,
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
            onClick={() => setSelectedImage(cert.photo)}
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
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>

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
