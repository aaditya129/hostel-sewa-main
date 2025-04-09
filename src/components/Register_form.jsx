import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import './Register_form.css';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// const navigate = useNavigate();

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    mobileNumber: '',
    address: '',
    profilePicture: null,
    gender: '',
    type: '',
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData({
      ...formData,
      [id]: files ? files[0] : value,
    });
  };

  const handleVerificationChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        data.append(key, value);
      }
    });
  
    try {
      const response = await axios.post('https://hostel-sewa-node.onrender.com/api/auth/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      console.log("Registration Response:", response.data);  // Debugging
  
      if (response.data.email) {
        setRegisteredEmail(response.data.email);  // ✅ Store email properly
        setShowVerification(true);
        setError('');
      } else {
        setError("Registration successful, but email verification failed.");
      }
  
    } catch (error) {
      setError(error.response?.data?.msg || 'Registration failed');
      console.error('Error during registration:', error);
    }
  };
  
  

  const handleVerify = async () => {
    console.log("Verifying Email:", registeredEmail);  // Debugging
    console.log("Verification Code:", verificationCode);
  
    if (!registeredEmail) {
      setError("Email is missing. Please try registering again.");
      return;
    }
  
    try {
      const response = await axios.post("https://hostel-sewa-node.onrender.com/api/auth/verify-email", {
        email: registeredEmail.toLowerCase(),  // Ensure lowercase
        verificationCode,
      });
  
      setSuccess(true);
      setShowVerification(false);
      setError('');
      console.log("Email verified:", response.data);
  
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError(error.response?.data?.msg || "Verification failed");
      console.error("Error verifying email:", error);
    }
  };
  
  
  

  return (
    <>
      <Navbar />
      <div className="register-form-container">
        <h2>Register</h2>
        {!showVerification ? (
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="fullName">Full Name*</label>
                <input type="text" id="fullName" required value={formData.fullName} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email Address*</label>
                <input type="email" id="email" required value={formData.email} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="password">Password*</label>
                <input type="password" id="password" required value={formData.password} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label htmlFor="confirmPassword">Confirm Password*</label>
                <input type="password" id="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="dateOfBirth">Date of Birth*</label>
                <input type="date" id="dateOfBirth" required value={formData.dateOfBirth} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label htmlFor="mobileNumber">Mobile Number*</label>
                <input type="text" id="mobileNumber" required value={formData.mobileNumber} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="address">Address*</label>
                <input type="text" id="address" required value={formData.address} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label htmlFor="profilePicture">Profile Picture</label>
                <input type="file" id="profilePicture" onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="gender">Gender*</label>
                <select id="gender" required value={formData.gender} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="type">Type*</label>
                <select id="type" required value={formData.type} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="student">Student</option>
                  <option value="non-student">Non-Student</option>
                </select>
              </div>
            </div>

            <button type="submit" className="submit-button">Register</button>
          </form>
        ) : (
          <div className="verification-container">
            <h3>Email Verification</h3>
            <p>We have sent a verification code to {registeredEmail}. Please enter it below.</p>
            <input type="text" placeholder="Enter verification code" value={verificationCode} onChange={handleVerificationChange} />
            <button onClick={handleVerify} className="submit-button">Verify</button>
          </div>
        )}

        {success && (
          <div className="success-message">
            <FaCheck className="success-icon" />
            <span>Registration & Verification Successful!</span>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}
      </div>
      <Footer />
    </>
  );
};

export default RegisterForm;
