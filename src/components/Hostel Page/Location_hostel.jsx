import React, { useState } from 'react';
import Navbar from '../Navbar'
import './Location_hostel.css'
import Hostel_card from '../Hostel_card'
import Filter_box from './Filter_box'
import Partners from '../Partners'
import Testimonial from '../Testimonial'
import Footer from '../Footer'

const Location_hostel = () => {

  const [activeTab, setActiveTab] = useState("girls");
  return (
  <>
  <Navbar/>
  <div className="hostelInfoContainer">
      <p className="hostelTagline">Find Your Ideal Hostel in Lalitpur: Over 100 Choices for Boys & Girls</p>
      <hr className="divider" />
      <h2 className="hostelMainTitle">Hostel of Insite Lalitpur</h2>
      <h3 className="hostelSubtitle">Who Provides Best Service in Lalitpur</h3>
    </div>
    <div className="heading">Featured Hostel</div>
<Hostel_card/>

<div className="location-hostel-page">
        {/* Tab Buttons */}
        <div className="tabs">
          <button 
            className={`tab-button ${activeTab === "girls" ? "active" : ""}`}
            onClick={() => setActiveTab("girls")}
          >
            For Girls Hostel
          </button>
          <button 
            className={`tab-button ${activeTab === "boys" ? "active" : ""}`}
            onClick={() => setActiveTab("boys")}
          >
            For Boys Hostel
          </button>
        </div>
        <div className="content">
        <Filter_box/> {/* Filter box on the left side */}
          
          <div className="hostel-cards-container">
            {/* Display Hostel Cards */}
            <Hostel_card />
          
          </div>
        </div>
      </div>

      <Testimonial/>
      <div className="gap"></div>

<Partners/>

      <Footer/>

    
        
  </>
  )
}

export default Location_hostel
