import React, { useEffect, useState } from 'react';
import './Partners.css';
import axios from 'axios';

const LogoSection = () => {
  const [associatePartners, setAssociatePartners] = useState([]);
  const [associateColleges, setAssociateColleges] = useState([]);
  const [paymentPartners, setPaymentPartners] = useState([]);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const [associateRes, collegeRes, paymentRes] = await Promise.all([
          axios.get('https://hostel-sewa-node.onrender.com/api/partners/associate-partners'),
          axios.get('https://hostel-sewa-node.onrender.com/api/partners/associate-colleges'),
          axios.get('https://hostel-sewa-node.onrender.com/api/partners/payment-partners'),
        ]);
        setAssociatePartners(associateRes.data);
        setAssociateColleges(collegeRes.data);
        setPaymentPartners(paymentRes.data);
      } catch (err) {
        console.error('Failed to fetch partner logos:', err);
      }
    };

    fetchLogos();
  }, []);

  return (
    <div className="logo-container">
      {/* Associate Partners */}
      <div className="logo-group">
        <h3 className="logo-title">Associate Partners</h3>
        <div className="logo-box">
          { associatePartners && associatePartners.map((item) => (
            <img key={item._id} src={item.photo} alt={item.name || 'Partner'} className="logo-image" />
          ))}
        </div>
      </div>

      {/* Associate Colleges */}
      <div className="logo-group">
        <h3 className="logo-title">Associate Colleges</h3>
        <div className="logo-box">
          { associateColleges && associateColleges.map((item) => (
            <img key={item._id} src={item.photo} alt={item.name || 'College'} className="logo-image" />
          ))}
        </div>
      </div>

      {/* Payment Partners */}
      <div className="logo-group">
        <h3 className="logo-title">Payment Partners</h3>
        <div className="logo-box">
          { paymentPartners && paymentPartners.map((item) => (
            <img key={item._id} src={item.photo} alt={item.name || 'Payment'} className="logo-image" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoSection;
