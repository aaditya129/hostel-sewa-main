// ChatWidget.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaFacebookMessenger, FaCommentDots } from 'react-icons/fa';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="chat-widget-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
<motion.div
  className="chat-icon whatsapp"
  initial={{ opacity: 0, x: 0 }}
  animate={isHovered ? { opacity: 1, x: -50 } : { opacity: 0, x: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }} // ✅ stays a bit longer
>
  <a href="https://wa.me/9779800000000" target="_blank" rel="noreferrer">
    <FaWhatsapp size={22} />
  </a>
</motion.div>

<motion.div
  className="chat-icon messenger"
  initial={{ opacity: 0, x: 0, y: 0 }}
  animate={isHovered ? { opacity: 1, x: 50, y: -20 } : { opacity: 0, x: 0, y: 0 }}
  transition={{ duration: 0.4, ease: "easeOut" }} // ✅ same for messenger
>
  <a href="https://m.me/yourpage" target="_blank" rel="noreferrer">
    <FaFacebookMessenger size={22} />
  </a>
</motion.div>


      {/* Main Chat Button */}
      <motion.div
        className="chat-main-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaCommentDots size={24} />
      </motion.div>
    </div>
  );
};

export default ChatWidget;
