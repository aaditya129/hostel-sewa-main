import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Partners from '../Partners';
import Footer from '../Footer';
import './FormList.css';
import { FaWpforms } from 'react-icons/fa';

const forms = [
  { name: 'Staff Form', path: '/form/staff' },
  { name: 'Job Form', path: '/form/job' },
  { name: 'Recommendation', path: '/form/recommendation' },
  { name: 'Hostel Purchase Form', path: '/form/purchase' },
  { name: 'Hostel Sales Form', path: '/form/sales' },
  { name: 'Hostel Monitoring Form', path: '/form/monitoring' },
];

const FormList = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="form-list-page">
        <h2 className="form-list-title">📄 All Available Forms</h2>
        <div className="form-grid">
          {forms.map((form, index) => (
            <div
              key={index}
              className="form-card"
              onClick={() => navigate(form.path)}
            >
              <div className="form-icon">
                <FaWpforms size={40} />
              </div>
              <h3 className="form-name">{form.name}</h3>
              <p className="form-action">Click to open</p>
            </div>
          ))}
        </div>
      </div>
      <Partners />
      <Footer />
    </>
  );
};

export default FormList;
