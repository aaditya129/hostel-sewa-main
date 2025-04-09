// AdminDashboard.jsx
import React, { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [hostelData, setHostelData] = useState({
    name: '',
    location: '',
    price: '',
    contact: '',
    totalBeds: '',
    availableBeds: '',
    type: '',
    email: '',
    facebookLink: '',
  });
  const [message, setMessage] = useState('');

  // Hardcoded credentials
  const hardcodedUsername = 'admin';
  const hardcodedPassword = 'password';

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginData.username === hardcodedUsername && loginData.password === hardcodedPassword) {
      setIsLoggedIn(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  const handleHostelChange = (e) => {
    const { name, value } = e.target;
    setHostelData({ ...hostelData, [name]: value });
  };

  const handleHostelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/hostels', hostelData); // Update with your API URL
      setMessage('Hostel added successfully!');
      setHostelData({
        name: '',
        location: '',
        price: '',
        contact: '',
        totalBeds: '',
        availableBeds: '',
        type: '',
        email: '',
        facebookLink: '',
      });
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || 'Something went wrong!'}`);
    }
  };

  return (
    <div className="admin-dashboard">
      {!isLoggedIn ? (
        // Login Form
        <div className="login-box">
          <h2>Admin Login</h2>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <form onSubmit={handleLoginSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={handleLoginChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        // Admin Dashboard
        <>
          <h1>Admin Dashboard</h1>
          {message && <p>{message}</p>}
          <form onSubmit={handleHostelSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Hostel Name"
              value={hostelData.name}
              onChange={handleHostelChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={hostelData.location}
              onChange={handleHostelChange}
              required
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={hostelData.price}
              onChange={handleHostelChange}
              required
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={hostelData.contact}
              onChange={handleHostelChange}
              required
            />
            <input
              type="number"
              name="totalBeds"
              placeholder="Total Beds"
              value={hostelData.totalBeds}
              onChange={handleHostelChange}
              required
            />
            <input
              type="number"
              name="availableBeds"
              placeholder="Available Beds"
              value={hostelData.availableBeds}
              onChange={handleHostelChange}
              required
            />
            <input
              type="text"
              name="type"
              placeholder="Type (e.g., Boys/Girls)"
              value={hostelData.type}
              onChange={handleHostelChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={hostelData.email}
              onChange={handleHostelChange}
              required
            />
            <input
              type="url"
              name="facebookLink"
              placeholder="Facebook Link"
              value={hostelData.facebookLink}
              onChange={handleHostelChange}
            />
            <button type="submit">Add Hostel</button>
          </form>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
