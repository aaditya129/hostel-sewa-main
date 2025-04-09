import React, { useState, useEffect } from "react";
import "./Student_login.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Partners from "./Partners";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import successAnimation from "./animations/success.json";

const API_URL = import.meta.env.VITE_API_URL || "https://hostel-sewa-node.onrender.com"; // ✅ Fix: Use `import.meta.env`


const StudentLogin = ({ register }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Redirect user if already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleToggle = () => {
    navigate("/login/owner");
  };
  const registers = () => {
    navigate("/register/student");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user._id);
      localStorage.setItem("storedUser", response.data.user);
      console.log(response.data.user)
      setSuccess(true);
      setLoading(false);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid credentials.");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-wrapper">
        {success ? (
          <div className="success-message">
            <Lottie animationData={successAnimation} loop={false} style={{ width: 200, height: 200 }} />
            <h3>Login Successful!</h3>
          </div>
        ) : (
          <div className="auth-card login-card">
            <div className="auth-header">Student Login</div>
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
              <div className="auth-field">
                <input
                  type="password"
                  placeholder="Password"
                  className="auth-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <div className="auth-error">{error}</div>}
              <div className="auth-actions">
                <a href="#" className="reset-password">Forgot password?</a>
              </div>
              <div className="auth-button-group">
                <button
                  type="button"
                  className="auth-submit"
                  onClick={handleLogin}
                  disabled={loading}
                  style={{
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.6 : 1,
                  }}
                >
                  {loading ? <div className="spinner"></div> : "Login"}
                </button>
              </div>
              <button type="button" onClick={handleToggle} className="auth-submit">Owner Login</button>
            </form>
            <div className="auth-footer center-align">
              <span>Don't have an account? <a className="switch-auth switch-to-signup" onClick={registers}>Signup</a></span>
            </div>
          </div>
        )}
      </div>
      <Partners />
      <Footer />
    </>
  );
};

export default StudentLogin;
