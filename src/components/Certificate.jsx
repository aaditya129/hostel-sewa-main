import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Certificate.css'; // Keeping your CSS unchanged

const CertificateGrid = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    axios.get('https://hostel-sewa-node.onrender.com/api/certificates')
      .then(response => {
        setCertificates(response.data);
      })
      .catch(error => {
        console.error('Error fetching certificates:', error);
      });
  }, []);

  return (
    <>
      <div className="heading">Legal<br/>Registration Certificates</div>
      <div className="certificate-grid">
        {certificates.length > 0 ? (
          certificates.map((cert) => (
            <img key={cert._id} src={cert.photo} alt={cert.title} className="certificate-image" />
          ))
        ) : (
          <p>No certificates found.</p>
        )}
      </div>
    </>
  );
};

export default CertificateGrid;
