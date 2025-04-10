import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Hostel_homepage.css';
import HostelCard from '../Hostel_card';
import Navbar from '../Navbar';
import Partners from '../Partners';
import Footer from '../Footer';
import student from '../Hostel Page/images/hostelpage_cover.jpeg';

const Hostel_homepage = () => {
  const location = useLocation();
  const [hostels, setHostels] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [district, setDistrict] = useState('');
  const [hostelType, setHostelType] = useState('');
  const [area, setArea] = useState('');
  const [seaterType, setSeaterType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Initial data fetch
  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await axios.get('https://hostel-sewa-node.onrender.com/api/hostel/getallhostel');
        setHostels(response.data.hostels);
      } catch (err) {
        setError('Failed to load hostels.');
      } finally {
        setLoading(false);
      }
    };
    fetchHostels();
  }, []);
  // Update this useEffect in your existing code
useEffect(() => {
  if (location.state?.filters) {
    const { searchTerm, seaterType, district, area, hostelType } = location.state.filters;
    setSearchTerm(searchTerm);
    setSeaterType(seaterType);
    setDistrict(district);
    setArea(area);
    setHostelType(hostelType);
  }
}, [location.state]);

  // Handle district from navigation state
  useEffect(() => {
    if (location.state?.selectedDistrict) {
      setDistrict(location.state.selectedDistrict);
    }
  }, [location.state]);

  // Automatically search when filters change
  useEffect(() => {
    handleSearch();
  }, [district, hostelType, searchTerm, hostels, area, seaterType]);

  // Search suggestions
  useEffect(() => {
    if (searchTerm.length > 0) {
      const filteredSuggestions = hostels
        .filter(hostel => 
          hostel.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(hostel => hostel.name)
        .filter((value, index, self) => self.indexOf(value) === index);
      
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm, hostels]);

  const handleSuggestionClick = (name) => {
    setSearchTerm(name);
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    let filtered = hostels;
    const searchTermLower = searchTerm.toLowerCase();

    filtered = filtered.filter(hostel => {
      const nameMatch = hostel.name.toLowerCase().includes(searchTermLower);
      const districtMatch = district 
        ? hostel.district?.toLowerCase() === district.toLowerCase()
        : true;
      const typeMatch = hostelType 
        ? hostel.type?.toLowerCase() === hostelType.toLowerCase()
        : true;
      const areaMatch = area 
        ? hostel.area?.toLowerCase() === area.toLowerCase()
        : true;
      const seaterMatch = seaterType 
        ? hostel.seaterOptions?.includes(seaterType)
        : true;

      return nameMatch && districtMatch && typeMatch && areaMatch && seaterMatch;
    });

    setFilteredHostels(filtered);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setDistrict('');
    setHostelType('');
    setArea('');
    setSeaterType('');
  };
  const [showFloatingSearch, setShowFloatingSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 300; // adjust as needed
      setShowFloatingSearch(window.scrollY > scrollThreshold);
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <Navbar />
      {searchTerm !== '' && (
  <div className="floating-search-bar">
    <input
      type="text"
      className="floating-search-input"
      placeholder="🔍 Search by Hostel Name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
)}
{showFloatingSearch && (
  <motion.div
    className="floating-search-bar"
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -50, opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <input
      type="text"
      className="floating-search-input"
      placeholder="🔍 Search by Hostel Name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </motion.div>
)}



      <motion.div
        className="cover-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.img
          className="cover-image"
          src={student}
          alt="Student Login"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="overlay_cover"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="welcome-text">Our Verified Hostels</p>

        
        
          <motion.div
            className="search-section"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="search-container">
            <div className="sticky-search-wrapper">
  <div className="search-input-container">
    <input
      type="text"
      placeholder="🔍 Search by Hostel Name..."
      className="search-input"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
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
</div>



              <select
                className="filter-dropdown"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              >
                <option value="">🏙️ District</option>
                <option value="Kathmandu">Kathmandu</option>
                <option value="Lalitpur">Lalitpur</option>
                <option value="Bhaktapur">Bhaktapur</option>
              </select>

              <select
                className="filter-dropdown"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              >
                <option value="">📍 Area</option>
                <option value="Thamel">Thamel</option>
                <option value="Boudha">Boudha</option>
                <option value="Patan">Patan</option>
                <option value="Koteshwor">Koteshwor</option>
                <option value="Gongabu">Gongabu</option>
              </select>

              <select
                className="filter-dropdown"
                value={hostelType}
                onChange={(e) => setHostelType(e.target.value)}
              >
                <option value="">🏠 Type</option>
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
                <option value="Co-ed">Co-ed</option>
              </select>

              <select
                className="filter-dropdown"
                value={seaterType}
                onChange={(e) => setSeaterType(e.target.value)}
              >
                <option value="">🛏️ Seater</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Triple">Triple</option>
                <option value="Dormitory">Dormitory</option>
              </select>

              <button 
                className="reset-button"
                onClick={resetFilters}
              >
                🔄 Reset
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {loading ? (
        <p className="loading-message">Loading hostels...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <HostelCard hostels={filteredHostels} />
      )}

      <div className="gap"></div>
      <Partners />
      <Footer />
    </>
  );
};

export default Hostel_homepage;