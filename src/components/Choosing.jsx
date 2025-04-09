import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './Choosing.css';

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const [isInView, setIsInView] = useState(false);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

  const boxVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="why-choose-us-wrapper">
    <motion.div
      ref={sectionRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.8 }}
      className="why-choose-us-left"
    >
      <h2 className="section-heading">Why Choose Us ?</h2>
      {/* <div className="curve-background">
        <svg width="100%" height="200px">
          <path
            d="M0,100 Q250,200 500,100 T1000,50 T1500,100 T2000,150"
            stroke="#A3A3A3"
            strokeWidth="2"
            strokeDasharray="6,6"
            fill="none"
          />
        </svg>
      </div> */}
  
      <div className="box-container">
        <motion.div
          className="info-box"
          variants={boxVariants}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>✅ <strong>100% Verified Hostels</strong> with secure & reliable listings.</p>
        </motion.div>
  
        <motion.div
          className="info-box lower-box"
          variants={boxVariants}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>🚀 <strong>Fast Booking</strong> process with <strong>secure payment options</strong>.</p>
        </motion.div>
  
        <motion.div
          className="info-box"
          variants={boxVariants}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p>💡 <strong>Affordable Pricing</strong> and <strong>24/7 Support</strong> for students.</p>
        </motion.div>
      </div>
    </motion.div>
  
    <div className="why-choose-us-ad">
  <div className="ad-box">
    <img 
      src="https://newspaperads.ads2publish.com/wp-content/uploads/2017/12/nescafe-cofee-just-add-hot-water-ad-times-of-india-delhi-28-12-2017.png" 
      alt="Ad Banner" height={250}
      className="ad-image" 
    />
    <h3>📢 Advertisement</h3>
    <p>Promote your hostel here!</p>
    <button className="ad-btn">Contact Us</button>
  </div>
</div>

  </div>
  
  );
};

export default WhyChooseUs;
