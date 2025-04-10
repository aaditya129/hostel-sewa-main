import React from 'react';
import './Boxes.css';

const services = [
  { icon: '📋', label: 'Registration / Renew' },
  { icon: '🛏️', label: 'Booking System' },
  { icon: '🎓', label: 'Training / Orientation' },
  { icon: '🛒', label: 'Sales / Purchase' },
  
];

const features = [
 
  { icon: '💰', title: 'Affordable Prices', description: 'Best deals with reasonable pricing on all services.' },
  { icon: '📞', title: 'Customer Support', description: 'Available 24/7 to assist you.' },
  { icon: '🔐', title: 'Secure Payments', description: 'Safe and hassle-free transactions.' },
  { icon: '⚡', title: 'Fast Booking', description: 'Book your hostel with a few clicks.' },
  { icon: '✔️', title: '100% Verified', description: 'All listings are quality checked.' },
];

const ServicesSection = () => {
  return (
    <section className="services-wrapper">
      {/* <h2 className="section-title">All About Hostel Services</h2> */}
          <h2 className="section-subtitle">Our Services</h2>

      <div className="service-categories">
        {services.map((s, index) => (
          <div className="service-icon-box" key={index}>
            <div className="icon-circle">{s.icon}</div>
            <p className="icon-label">{s.label}</p>
          </div>
        ))}
      </div>

  

      <div className="feature-grid">
        {features.map((f, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
