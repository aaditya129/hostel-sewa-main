import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Photos.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Import different images for each district
import kathmanduImage from '../assets/kathmandu.jpg';
import lalitpurImage from '../assets/lalitpur.jpg';
import bhaktapurImage from '../assets/bhaktapur.jpg';

const Photos = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  // District data with unique images
  const districts = [
    { 
      name: 'Kathmandu', 
      image: kathmanduImage,
      alt: 'Kathmandu Durbar Square'
    },
    { 
      name: 'Lalitpur', 
      image: lalitpurImage,
      alt: 'Patan Durbar Square'
    },
    { 
      name: 'Bhaktapur', 
      image: bhaktapurImage,
      alt: 'Bhaktapur Durbar Square'
    }
  ];

  const handleViewHostels = (districtName) => {
    navigate('/hostel', { 
      state: { selectedDistrict: districtName } 
    });
  };

  const slideNext = () => {
    sliderRef.current?.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: 'smooth',
    });
  };

  const slidePrev = () => {
    sliderRef.current?.scrollBy({
      left: -sliderRef.current.offsetWidth,
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <p className="heading">In which district do you need hostel?</p>
      <div className="slider-containers">
        <button className="slider-button prev" onClick={slidePrev}>
          <FaArrowLeft />
        </button>
        
        <div className="image-containers" ref={sliderRef}>
          {districts.map((district) => (
            <div key={district.name} className="image-card">
              <img 
                src={district.image} 
                alt={district.alt} 
                className="imagess" 
              />
              <div className="overlay">
                <h2>{district.name}</h2>
                <button 
                  onClick={() => handleViewHostels(district.name)} 
                  className="view-button"
                >
                  View Hostels
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="slider-button next" onClick={slideNext}>
          <FaArrowRight />
        </button>
      </div>
    </motion.div>
  );
};

export default Photos;