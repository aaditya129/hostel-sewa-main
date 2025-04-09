import React from 'react'
import './Filter_box.css'
const Filter_box = () => {
  return (
    <div>
      
<div className="filters-container">
      <h2 className="filters-title">Filters</h2>
      
      <div className="filter-group">
        <label className="filter-label">What are you looking for?</label>
        <input type="text" className="filter-input" placeholder="Enter keywords" />
      </div>
      
      <div className="filter-group">
        <label className="filter-label">Where to look?</label>
        <div className="location-input">
          <input type="text" className="filter-input" placeholder="Location" />
          <span className="location-icon">📍</span>
        </div>
      </div>
      
      <div className="filter-group">
        <label className="filter-label">Category</label>
        <select className="filter-select">
          <option>Hostel in Lalitpur</option>
          {/* Add other options here */}
        </select>
      </div>
      
      <div className="filter-group">
        <label className="filter-label">Number of Rooms</label>
        <select className="filter-select">
          <option>Any</option>
          {/* Add other options here */}
        </select>
      </div>
      
      <div className="filter-group">
        <label className="filter-label">Level of Quality</label>
        <select className="filter-select">
          <option>Any</option>
          {/* Add other options here */}
        </select>
      </div>
      
      <div className="filter-group">
        <label className="filter-label">Amenities</label>
        <div className="filter-checkbox-group">
          <label><input type="checkbox" /> Bike Parking</label>
          <label><input type="checkbox" /> Wireless Internet</label>
          <label><input type="checkbox" /> Study Table</label>
          {/* Add more checkboxes here */}
        </div>
      </div>
      
      <div className="filter-group">
        <label className="filter-label">Order by</label>
        <select className="filter-select">
          <option>Latest</option>
          {/* Add other sorting options here */}
        </select>
      </div>
      
      <button className="search-button">🔍 Search Hostel</button>
      <button className="reset-button">🔄 Reset Filters</button>
    </div>

    </div>
  )
}

export default Filter_box
