import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Testimonial.css';
import personFace from '../assets/face.jpeg';

const Testimonial = () => {
  const testimonialsData = [
    {
      image: personFace,
      name: 'John Doe',
      rating: 3,
      review: 'This hostel is fantastic! The services are top-notch, and the staff is incredibly friendly.',
    },
    {
      image: personFace,
      name: 'Jane Smith',
      rating: 4,
      review: 'Great location and comfortable rooms. Highly recommended!',
    },
    {
      image: personFace,
      name: 'Michael Johnson',
      rating: 1,
      review: 'Clean environment and helpful staff. I would stay here again.',
    },
    {
      image: personFace,
      name: 'Emily Davis',
      rating: 2,
      review: 'Exceptional experience, everything was perfect!',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesPerPage = 1; // Display one testimonial per slide
  const totalPages = Math.ceil(testimonialsData.length / slidesPerPage);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalPages);
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [totalPages]);

  const slideVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="testimonial-section">
      <h2 className="testimonial-heading">Testimonial and Review</h2>
      <div className="testimonial-container">
      <div className="testimonial-slider">
  {testimonialsData.map((testimonial, index) => {
    let position = 'nextSlide';
    if (index === currentSlide) {
      position = 'activeSlide';
    } else if (
      index === currentSlide - 1 ||
      (currentSlide === 0 && index === testimonialsData.length - 1)
    ) {
      position = 'lastSlide';
    }

    return (
      <div className={`testimonial-box stacked-slide ${position}`} key={index}>
        <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
        <div className="testimonial-content">
          <div className="name-rating">
            <span className="testimonial-name">{testimonial.name}</span>
            <span className="rating">{'⭐'.repeat(testimonial.rating)}</span>
          </div>
          <p className="testimonial-review">"{testimonial.review}"</p>
        </div>
      </div>
    );
  })}
</div>

       
      </div>
      <div className="dots-container">
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
