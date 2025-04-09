import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import circle from '../assets/circle.png';
import box3 from '../assets/box3.png';
import box4 from '../assets/box4.png';
import box5 from '../assets/box5.png';
import box6 from '../assets/box6.png';
import box7 from '../assets/box7.png';
import box8 from '../assets/box8.png';
import box2 from '../assets/box2.png';

import './Boxes.css';

const CircleGrid = () => {
  const controls = useAnimation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      { threshold: 0.2 } // Trigger animation when 20% of the section is visible
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

  const dropVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="big-circle"
      ref={sectionRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="circle-wrapper">
        {[
          { img: circle, text: 'REGISTRATION / RENEW' },
          { img: box2, text: 'BOOKING SYSTEM' },
          { img: box3, text: 'TRAINING / ORIENTATION' },
          { img: box4, text: 'TRAINING / ORIENTATION' },
          { img: box5, text: 'SOCIAL MEDIA MANAGEMENT' },
          { img: box6, text: 'DESIGN / PRINTING' },
          { img: box7, text: 'SALES / PURCHASE' },
          { img: box8, text: 'HELP / SUPPORT' },
        ].map((item, index) => (
          <motion.div
            className="circle-container"
            key={index}
            variants={dropVariants}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="circles">
              <img src={item.img} alt="circle" className="circle-img" />
            </div>
            <section className="circle-text">{item.text}</section>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CircleGrid;
