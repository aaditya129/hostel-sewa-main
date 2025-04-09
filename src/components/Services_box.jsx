import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import axios from 'axios';
import './Services_box.css';
import checkIcon from '../assets/verified.png';

const ServicesBox = () => {
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const [services, setServices] = useState([]);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('https://hostel-sewa-node.onrender.com/api/services');
        setServices(res.data);
      } catch (err) {
        console.error('Failed to fetch services', err);
      }
    };

    fetchServices();
  }, []);

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

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const boxVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <p className="service-text">Our Services</p>
      <motion.div
        className="out"
        ref={sectionRef}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {services.map((service, index) => (
          <motion.div className="outer-border" key={index} variants={boxVariants}>
            <div className="verified-card">
              <img src={checkIcon} alt="Verified" className="image" />
              <h2 className="verified-text">{service.heading}</h2>
              <p className="description-text">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default ServicesBox;
