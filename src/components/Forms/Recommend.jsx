import React, { useRef, useState } from 'react';
import Navbar from '../Navbar';
import './Recommend.css';

const Recommend = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('No file chosen');

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <>
      <Navbar />
      <div className="gap"></div>
      <div className="recommend-container">
        {/* Greeting Section */}
        <div className="recommend-greeting">
          <p>Mr. Director</p>
          <p>Hostel Service Pvt.Ltd</p>
        </div>

        {/* Today's Date */}
        <div className="recommend-date">
          <label>Today's Date</label>
          <input type="date" />
        </div>

        {/* Subject Section */}
        <div className="recommend-subject">
          <p style={{ fontWeight: 'bold' }}>Subject: Get employment in the post</p>
          <div className="gap"></div>
          <p>
            As the recommendation of this organization is required for the hostel registration under the Ward Office / Household and Small Business Office in the above connection, I am submitting this statement with a request to examine and recommend the necessary infrastructures prepared for the operation of the hostel
          </p>
        </div>
      </div>

      <div className="gap"></div>
      <div className="recommend-form-wrapper">
        {/* Upload Photo Section */}
        <div className="upload-photo smaller" onClick={handleFileClick}>
          <div className="upload-plus">+</div>
          <p>Upload Photo</p>
          <p className="file-name">{fileName}</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* Form Section */}
        <div className="recommend-form">
          <div>
            <label>Applicant*</label>
            <input type="text" placeholder="ABC" className="recommend-input" />
          </div>
          <div>
            <label>Director's Name</label>
            <input type="text" placeholder="ABC" className="recommend-input" />
          </div>
          <div>
            <label>Name of Hostel</label>
            <input type="text" placeholder="ABC" className="recommend-input" />
          </div>
          <div>
            <label>Hostel Address</label>
            <input type="text" placeholder="ABC" className="recommend-input" />
          </div>
          <div>
            <label>Mobile Number</label>
            <input type="text" placeholder="9845055444" className="recommend-input" />
          </div>

          {/* Digital Signature */}
          <div className="digital-signature">
            Digital Signature..................
          </div>

          {/* Note Section */}
          <div className="recommend-note">
            Note: The map of the location where the hostel operates is on the back.
          </div>
        </div>
      </div>
    </>
  );
};

export default Recommend;
