import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cover_photo.css';
import student from '../assets/student_login.jpeg';

const WelcomeSection = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    searchTerm: '',
    seaterType: '',
    district: '',
    area: '',
    hostelType: ''
  });
  const [hostels, setHostels] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch hostels for suggestions
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await axios.get('https://hostel-sewa-node.onrender.com/api/hostel/getallhostel');
        setHostels(response.data.hostels);
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };
    fetchHostels();
  }, []);

  // Handle search suggestions
  useEffect(() => {
    if (filters.searchTerm.length > 0) {
      const filtered = hostels
        .filter(hostel => 
          hostel.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
        )
        .map(hostel => hostel.name)
        .filter((value, index, self) => self.indexOf(value) === index);
      
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [filters.searchTerm, hostels]);

  const handleSearch = () => {
    navigate('/hostel', { 
      state: { filters } 
    });
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleSuggestionClick = (name) => {
    setFilters(prev => ({
      ...prev,
      searchTerm: name
    }));
    setShowSuggestions(false);
  };

  return (
    <div className="coverSectionContainer">
      <motion.img
        className="coverSectionImage"
        src={student}
        alt="Student Login"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="coverSectionOverlay">
        <motion.p
          className="coverSectionWelcomeText"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          WELCOME TO
        </motion.p>
        
        <motion.h1
          className="coverSectionTitle"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="coverSectionHostelColor">HOSTEL</span>{' '}
          <span className="coverSectionSewa">SEWA</span>
        </motion.h1>
        
        <motion.p
          className="coverSectionSubtitle"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          "Your Second Home – Premium Services for Students at Hostelsewa Nepal"
        </motion.p>

        <motion.div
          className="coverSectionInputField"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          
          <div className="coverSectionSearchBar">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Hostel Name"
                className="coverSectionSearchInput"
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="suggestions-dropdown">
                  {suggestions.map((name, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSuggestionClick(name);
                      }}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <select 
              className="coverSectionQualityDropdown"
              value={filters.seaterType}
              onChange={(e) => handleFilterChange('seaterType', e.target.value)}
            >
              <option value="">Seater Type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Triple">Triple</option>
              <option value="Dormitory">Dormitory</option>
            </select>
            
            <button 
              className="coverSectionSearchButton"
              onClick={handleSearch}
            >
              Search Hostel
            </button>
          </div>
        </motion.div>

        <motion.div
          className="coverSectionFilterBar"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <select 
            className="coverSectionFilterDropdown"
            value={filters.district}
            onChange={(e) => handleFilterChange('district', e.target.value)}
          >
            <option value="">District</option>
            <option value="Kathmandu">Kathmandu</option>
            <option value="Lalitpur">Lalitpur</option>
            <option value="Bhaktapur">Bhaktapur</option>
          </select>
          
          <select 
            className="coverSectionFilterDropdown"
            value={filters.area}
            onChange={(e) => handleFilterChange('area', e.target.value)}
          >
            <option value="">Area</option>
            <option value="Thamel">Thamel</option>
            <option value="Baneshwor">Baneshwor</option>
            <option value="Patan">Patan</option>
          </select>
          
          <select 
            className="coverSectionFilterDropdown"
            value={filters.hostelType}
            onChange={(e) => handleFilterChange('hostelType', e.target.value)}
          >
            <option value="">Hostel Type</option>
            <option value="Boys">Boys Hostel</option>
            <option value="Girls">Girls Hostel</option>
            <option value="Co-ed">Co-ed Hostel</option>
          </select>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomeSection;