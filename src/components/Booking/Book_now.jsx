import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import esewaLogo from '../Store/esewa.png'; // Replace with actual path to eSewa 
import './Book_now.css';
import image from './hostelcard1.png'
import Testimonial from '../Testimonial'
import Partners from '../Partners'
import Footer from '../Footer';
import student from '../About US/student_login.jpeg'

const BookNow = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const handleMethodChange = (event) => setSelectedMethod(event.target.value);

  return (
    
    <>
      <Navbar />

      <div className="cover-container">
        <img className="cover-image" src={student} alt="Student Login" />
        <div className="overlay_cover">
          <p className="welcome-text">Roommate Boy's Hostel</p>
        </div>
      </div>


      <div className="booking-container">
        {/* Left Side Form Section */}
        <section className="student-info-section">
          <h2>📘 Student Information</h2>
          <form>
            <div className="form-row">
              <label>
                Seater*
                <select required className="select-input">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  {/* Add more options if needed */}
                </select>
              </label>
              <label>
               
                Number of Tenant*
                <input type="text" placeholder="1" required className="text-input" />
              </label>
              <label>
                Length of Stay (Month)
                <input type="text" placeholder="0" className="text-input" />
              </label>
            </div>

            <div className="form-row">
              <input type="text" name="fullName" placeholder="Full Name*" required />
              <input type="text" name="address" placeholder="Address*" required />
            </div>

            <div className="form-row">
              <input type="text" name="mobile" placeholder="Mobile Number*" required />
              <input type="email" name="email" placeholder="Email Address*" required />
            </div>

            <textarea name="description" placeholder="Description" rows="4"></textarea>
<div className="gap"></div>
            <div className="form-row">
              <label>
                Booking Amount
                <input type="text" value="1000" readOnly className="booking-amount" />
              </label>
            </div>

            <div className="min-booking-warning">Minimum Booking Amount : 1000</div>

            <div className="payment-methods-container">
              <h3>Select Payment Methods</h3>
              <div className="payment-methods">
                <label className={`payment-card ${selectedMethod === 'ime' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="ime"
                    checked={selectedMethod === 'ime'}
                    onChange={handleMethodChange}
                  />
                  <img src={esewaLogo} alt="Global IME Bank" className="payment-logo" />
                  <div className="payment-info">
                    <span className="payment-name">Global IME Bank</span>
                    <span>0123456789234</span>
                  </div>
                </label>

                <label className={`payment-card ${selectedMethod === 'esewa' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="esewa"
                    checked={selectedMethod === 'esewa'}
                    onChange={handleMethodChange}
                  />
                  <img src={esewaLogo} alt="eSewa" className="payment-logo" />
                  <div className="payment-info">
                    <span className="payment-name">eSewa</span>
                    <span>9845055678</span>
                  </div>
                </label>
              </div>
              <p className="add-payment-method">* Add other payment method</p>
            </div>

            <button type="submit" className="submit-button">Submit</button>
          </form>
        </section>

        {/* Right Sidebar Section */}
        <aside className="sidebar">
          {/* Your Selection */}
          <div className="your-selection">
            <h3>📍 Your Selection</h3>
            <img src={image} alt="Selected Hostel" className="hostel-image" />
            <ul>
              <li>Boys Hostel</li>
              <li>📞 984716333, 9810224477</li>
              <li>✉️ radhikakawar@gmail.com</li>
              <li>📍 Kathmandu</li>
              <li>🔗 <a href="https://facebook.com">Facebook Page</a></li>
              <li>🛏️ 30 (Total Beds)</li>
              <li>🛏️ 17 (Available Beds)</li>
            </ul>
          </div>

          {/* Need Help Section */}
          <div className="need-help">
            <h3>☎️ Need Help?</h3>
            <p>9851314344, 9851314345</p>
            <p>Or</p>
            <a href="mailto:support@example.com">✉️ Email Us</a>
          </div>
        </aside>
      </div>
<div className="gap"></div>
      <Testimonial/>
   <div className="gap"></div>
   <Partners/>
   <Footer/>
  
    </>
  );
};

export default BookNow;
