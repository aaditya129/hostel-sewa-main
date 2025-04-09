import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './Owner_login.css';
import Partners from './Partners';
import Navigate from './Navigate/Navigate';

const API_URL = import.meta.env.VITE_API_URL || "https://hostel-sewa-node.onrender.com";

const OwnerLogin = ({ register_owner }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggle = () => {
    navigate('/login/student');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/loginOwner`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return alert(data.message || 'Login failed');
      }

      // Save token and user data to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('currentUser', JSON.stringify(data.user));

      alert("✅ Login successful!");
      navigate('/'); // Redirect to dashboard/home
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-wrapper">
        <div className="auth-card login-card">
          <div className="auth-header">Owner Login</div>
          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <div className="auth-field">
              <input
                type="email"
                placeholder="Email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{display:"flex"}} className="auth-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="auth-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="password-toggle"
                onClick={togglePasswordVisibility}
                style={{display:"flex", alignItems:"center"}}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            <p style={{ fontSize: "0.65rem", color: "#777", marginTop: "-1px", marginBottom: "1px" }}>
  🔒 If you just registered, please contact management for your password.
</p>
            <div className="auth-actions">
              <a className="reset-password">Forgot password?</a>
            </div>
            <div className="auth-button-group">
              <button type="button" className="auth-submit" onClick={handleLogin}>
                Login
              </button>
            </div>
            <button
              type="button"
              onClick={handleToggle}
              className="auth-submit"
              style={{
                marginTop: "10px",
                background: "linear-gradient(135deg, #1e90ff, #ffa500)",
              }}
            >
              Student Login
            </button>
          </form>

          <div className="auth-footer center-align">
            <span>
              Don’t have an account?{" "}
              <a className="switch-auth switch-to-signup" onClick={register_owner}>
                Signup
              </a>
            </span>
          </div>

          <div className="separator"></div>
          <div className="social-login">
            <a href="#" className="social-button google-button">
              <img
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt="Google Logo"
                className="google-icon"
              />
              <span>Login with Google</span>
            </a>
          </div>
          
        </div>
        
      </div>

      <Partners />
      <Footer />
    </>
  );
};

export default Navigate(OwnerLogin);
