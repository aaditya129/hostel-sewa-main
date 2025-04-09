import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Gallery_images.css';
import Partners from '../Partners';
import Footer from '../Footer';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';

const Gallery_images = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  // Fetch events with all their images
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get('https://hostel-sewa-node.onrender.com/api/event-gallery');
        const eventsWithImages = res.data.filter(event => event.images.length > 0);
        setEvents(eventsWithImages);
      } catch (err) {
        console.error('Failed to fetch event gallery:', err);
      }
    };

    fetchGallery();
  }, []);

  // Open modal and load selected event
  const openModal = (event) => {
    setSelectedEvent(event);
    setImageIndex(0);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setImageIndex(0);
  };

  const goToPrevious = () => {
    setImageIndex((prev) => (prev - 1 + selectedEvent.images.length) % selectedEvent.images.length);
  };

  const goToNext = () => {
    setImageIndex((prev) => (prev + 1) % selectedEvent.images.length);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  return (
    <>
      <div className="gallery-container">
        <h2 className="gallery-title">Gallery (Events)</h2>
        <div className="gallery-grid">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              className="gallery-card"
              onClick={() => openModal(event)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{
                scale: 1.1,
                rotate: 3,
                transition: { duration: 0.3 },
              }}
              transition={{ duration: 0.5 }}
            >
              <img src={event.images[0].url} alt={event.eventName} className="gallery-image" />
              <p className="gallery-card-title">{event.eventName}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Viewer */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="gallery-modal-overlay"
            onClick={closeModal}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="gallery-modal-container"
              onClick={(e) => e.stopPropagation()}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              transition={{ duration: 0.5 }}
            >
              <button className="gallery-modal-close" onClick={closeModal}>
                <FaTimes />
              </button>

              <h2 className="gallery-modal-title">{selectedEvent.eventName}</h2>

              <motion.img
                key={selectedEvent.images[imageIndex].url}
                src={selectedEvent.images[imageIndex].url}
                alt={selectedEvent.eventName}
                className="gallery-modal-image"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={imageVariants}
                transition={{ duration: 0.9 }}
              />

              <div className="gallery-modal-navigation">
                <button onClick={goToPrevious} className="gallery-modal-prev">
                  <FaChevronLeft />
                </button>
                <button onClick={goToNext} className="gallery-modal-next">
                  <FaChevronRight />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Partners />
      <Footer />
    </>
  );
};

export default Gallery_images;
