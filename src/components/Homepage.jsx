import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import student from '../assets/Student_login.jpeg';
import Photos from './Photos';
import Services_box from './Services_box';
import HostelCard from './Hostel_card'; // ✅ Import HostelCard
import Cover_photo from './Cover_photo';
import Choosing from './Choosing';
import Mission_box from './Mission_box';
import Achievement from '../Achievement';
import FAQ from './FAQ.jsx';
import Post from './Post.jsx';
import Partners from './Partners.jsx';
import Review from './Review.jsx';
import Gallery from './Gallery.jsx';
import Testimonial from './Testimonial';
import Vision_box from './Vision_box.jsx';
import Boxes from './Boxes.jsx';
import './Homepage.css';
import Footer from './Footer';
import Nearby_hostel from './Hostel Page/Nearby_hostel.jsx'

const Homepage = () => {
  const [hostels, setHostels] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await axios.get('https://hostel-sewa-node.onrender.com/api/hostel/getallhostel');
        setHostels(response.data.data);
        setFilteredHostels(response.data.hostels); // Set filtered hostels initially
      } catch (err) {
        console.error('Error fetching hostels:', err);
        setError('Failed to load hostels.');
      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
  }, []);

  return (
    <>
      <Navbar />
      <Cover_photo />
      <Photos />

      <div className="heading">Featured Hostel</div>

      {/* ✅ Pass the fetched hostel data to HostelCard */}
      {loading ? (
        <p style={{ textAlign: 'center', margin: '20px' }}>Loading hostels...</p>
      ) : error ? (
        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
      ) : (
        <HostelCard hostels={filteredHostels} />
      )}

      <div className="introduction-container">
        <div className="introduction-text">
          <h2>Introduction</h2>
          <p>
            Hostel Sewa Pvt Ltd is an organization that helps hostel businesses 
            and students who want to stay in hostels. Through this platform, you 
            can explore, get information, and even book hostels in major cities like 
            Kathmandu and Lalitpur. Hostel owners can also register their hostels through 
            our management system. Additionally, you can find hostel-related essentials and 
            contact the Nepal Hostel Association for assistance.
          </p>
        </div>
        <div className="introduction-image">
          <img src={student} alt="Hostel Sewa Introduction" />
        </div>
      </div>

      <Choosing />
      {/* <p className='heading'>All about Hostel</p> */}
      <Boxes />
      {/* <Services_box /> */}
      <Mission_box />
      <Vision_box />
      <Achievement />
      <Gallery />
      <Review />
      <Nearby_hostel/>
      <Testimonial />
      <FAQ />
      <Post />
      <Partners />
      <Footer />
    </>
  );
};

export default Homepage;
