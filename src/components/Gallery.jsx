import React, { useState, useEffect } from 'react';
import './Gallery.css';
import axios from 'axios';

const PhotoGallery = () => {
  const [images, setImages] = useState([]);
  const [gridIndexes, setGridIndexes] = useState([0, 1, 2, 3, 4, 5]); // 6 rotating images

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get('https://hostel-sewa-node.onrender.com/api/event-gallery/all-images');
        const urls = res.data.map(img => img.url);
        setImages(urls);
      } catch (err) {
        console.error('Error fetching gallery images:', err);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length < 6) return;

    const interval = setInterval(() => {
      setGridIndexes((prev) => {
        const next = [...prev];
        next.push(next.shift()); // Rotate forward
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <>
      <h1 className="gallery-head">Photo Gallery</h1>
      <div className="carousel-container">
        {isMobile ? (
          <img
            src={images[currentIndex]}
            alt={`Gallery ${currentIndex}`}
            className="carousel-image"
          />
        ) : (
          gridIndexes.slice(0, 6).map((imgIndex, pos) => (
            <img
              key={imgIndex}
              src={images[imgIndex]}
              alt={`Grid ${imgIndex}`}
              className={`carousel-image image-${pos}`}
            />
          ))
        )}
      </div>
    </>
  );
};

export default PhotoGallery;
