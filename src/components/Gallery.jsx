import React, { useState, useEffect } from 'react';
import './Gallery.css';
import axios from 'axios';

const PhotoGallery = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <>
      <h1 className="gallery-head">Photo Gallery</h1>
      <div className="carousel-container">
        {/* ✅ Mobile view: Show only one image (carousel logic) */}
        {images.length > 0 &&
          images.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Gallery ${index}`}
              className={`carousel-image image-${index}`}
              style={{
                display: window.innerWidth < 768
                  ? index === currentIndex ? 'block' : 'none'
                  : 'block'
              }}
            />
          ))}
      </div>
    </>
  );
};

export default PhotoGallery;
