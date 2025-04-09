import React, { useState } from "react";
import "./Owner_register.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "https://hostel-sewa-node.onrender.com";

const RegisterHostel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    district: "",
    address: "",
    addressDetails: "",
    mobileNumber: "",
    contactNumber: "",
    faxNumber: "",
    email: "",
    website: "",
    hostelType: "",
    ownerDetail: "",
    ownerContactNumber: "",
    registrationNumber: "",
    panNumber: "",
    locationName: "",
    minimumRate: "",
    maximumRate: "",
    description: "",
    hostelOverview: "",
  });

  const [logo, setLogo] = useState(null);
  const [panPhoto, setPanPhoto] = useState(null);
  const [regPhoto, setRegPhoto] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    data.append("hostelLogo", logo);
    data.append("hostelPanPhoto", panPhoto);
    data.append("hostelRegistrationPhoto", regPhoto);

    try {
      const response = await fetch(`${API_URL}/api/auth/registerOwner`, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.msg || "Registration failed");
        return;
      }

      // ✅ Show success animation
      setSuccess(true);

      // ✅ Redirect after 3 seconds
      setTimeout(() => {
        navigate("/login/owner");
      }, 3000);
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <form className="register-hostel-form" onSubmit={handleSubmit}>
        <h2>Register Your Hostel</h2>

        {/* ✅ Success animation */}
        {success && (
          <div className="registration-success-popup">
            <div className="checkmark">✔</div>
            <p>Registration Successful!</p>
          </div>
        )}

        <div className="form-group">
          <label>Full Name (owner) </label>
          <input type="text" name="fullName" required onChange={handleChange} />

          <label>District</label>
          <input type="text" name="district" required onChange={handleChange} />

          <label>Address</label>
          <input type="text" name="address" required onChange={handleChange} />

          <label>Address Detail</label>
          <input type="text" name="addressDetails" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input type="tel" name="mobileNumber" required onChange={handleChange} />

          <label>Contact Number</label>
          <input type="tel" name="contactNumber" onChange={handleChange} />

          <label>Fax Number</label>
          <input type="tel" name="faxNumber" onChange={handleChange} />

          <label>Email</label>
          <input type="email" name="email" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Website</label>
          <input type="url" name="website" onChange={handleChange} />

          <label>Hostel Type</label>
          <select name="hostelType" required onChange={handleChange}>
            <option value="">-- Select --</option>
            <option value="boys hostel">Boys Hostel</option>
            <option value="girls hostel">Girls Hostel</option>
          </select>

          <label>Owner Detail</label>
          <input type="text" name="ownerDetail" required onChange={handleChange} />

          <label>Owner Contact Number</label>
          <input type="tel" name="ownerContactNumber" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Registration Number</label>
          <input type="text" name="registrationNumber" required onChange={handleChange} />

          <label>PAN Number</label>
          <input type="text" name="panNumber" required onChange={handleChange} />

          <label>Location Name</label>
          <input type="text" name="locationName" required onChange={handleChange} />

          <label>Minimum Rate</label>
          <input type="number" name="minimumRate" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Maximum Rate</label>
          <input type="number" name="maximumRate" required onChange={handleChange} />

          <label>Hostel Logo</label>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setLogo)} />

          <label>Hostel PAN Photo</label>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setPanPhoto)} />

          <label>Hostel Registration Photo</label>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setRegPhoto)} />
        </div>

        <div className="form-group textarea-group">
          <label>Description</label>
          <textarea name="description" rows="2" onChange={handleChange}></textarea>

          <label>Hostel Overview</label>
          <textarea name="hostelOverview" rows="4" onChange={handleChange}></textarea>
        </div>

        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default RegisterHostel;
