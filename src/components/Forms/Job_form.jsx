import React from 'react'
import Navbar from '../Navbar'
import './Job_form.css'
import { FaCalendarAlt } from 'react-icons/fa';
const Job_form = () => {
  return (
   <>

   <Navbar/>
   <div className="gap"></div>
   <div style={{ width: '80%', margin: '0 auto', fontFamily: 'Inter, sans-serif', lineHeight: '1.6', color: '#333' }}>
      {/* Greeting Section */}
      <div style={{ textAlign: 'left' }}>
        <p>Mr. Director</p>
        <p>Hostel Service Pvt.Ltd</p>
      </div>

      {/* Today's Date */}
      <div style={{ textAlign: 'right', marginTop: '-50px' }}>
        <label style={{ fontSize: '0.9rem', color: '#555' }}>Today's Date</label>
        <input 
          type="date" 
          style={{ padding: '8px', fontSize: '1rem', border: '1px solid #ddd', borderRadius: '5px', marginLeft: '10px' }}
        />
      </div>

      {/* Subject Section */}
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <p style={{ fontWeight: 'bold' }}>Subject: Get employment in the post</p>
      </div>

      {/* Body Section */}
      <div style={{ textAlign: 'left', marginTop: '20px' }}>
        <p>Dear Sir,</p>
        <p>
          As I want to work in your hostel in the above-mentioned relation. I have submitted my true and correct details 
          as well as the required documents.
        </p>
      </div>
    </div>

    <div className="gap"></div>
    <div className="staff-form-container">
      <h2>Job Wanted Form</h2>
      <form className="staff-form">
        <div className="form-row">
          <div className="form-group">
            <label>Today's Date</label>
            <div className="input-with-icon">
              <input type="date" placeholder="mm/dd/yyyy" />
              <FaCalendarAlt className="calendar-icon" />
            </div>
          </div>
          <div className="form-group">
            <label>Hostel Name*</label>
            <input type="text" placeholder="Enter hostel name" required />
          </div>
          <div className="form-group">
            <label>Hostel Type</label>
            <select>
              <option>Boys Hostel</option>
              <option>Girls Hostel</option>
              <option>Co-ed Hostel</option>
            </select>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Hostel's Capacity</label>
            <input type="number" placeholder="30" />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" placeholder="Kathmandu" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Mobile No.*</label>
            <input type="text" placeholder="9845055444" required />
          </div>
          <div className="form-group">
            <label>Staff Number in Hostel</label>
            <input type="number" placeholder="4" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Job's Nature</label>
            <input type="text" placeholder="XYZ" />
          </div>
          <div className="form-group">
            <label>Monthly Income</label>
            <input type="text" placeholder="20,000" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Age Range</label>
            <div className="age-range">
              <select>
                <option>From</option>
              </select>
              <select>
                <option>To</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Select Gender</label>
            <select>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <p className="form-fees">Form Fees: Only Nrs 200</p>

        <h3>Select Payment Methods</h3>
        <div className="payment-methods">
          <label className="payment-option">
            <input type="radio" name="payment" />
            <span>Global IME Bank</span>
          </label>
          <label className="payment-option">
            <input type="radio" name="payment" />
            <span>Esewa</span>
          </label>
        </div>

        <p className="add-payment-method">+ Add other payment method</p>

        <button type="submit" className="submit-btn">Submit</button>

      </form>
      </div>
   </>
  )
}

export default Job_form
