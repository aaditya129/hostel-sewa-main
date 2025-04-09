import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Gallery.css';
import axios from 'axios';

const PhotoGallery = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch all gallery images from backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get('https://hostel-sewa-node.onrender.com/api/event-gallery/all-images');
        const urls = res.data.map(img => img.url); // extract image URLs
        setImages(urls);
      } catch (err) {
        console.error('Error fetching gallery images:', err);
      }
    };

    fetchImages();
  }, []);

  // Image change interval
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 sec

    return () => clearInterval(interval);
  }, [images]);

  const variants = {
    enter: { x: "100%", opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  return (
    <>
      <h1 className='gallery-head'>Photo Gallery</h1>
      <div className="carousel-container">
        <AnimatePresence initial={false}>
          {images.length > 0 && (
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Slide ${currentIndex}`}
              className="carousel-image"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8 }}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default PhotoGallery;
