import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Partners from '../Partners';
import Footer from '../Footer';
import axios from 'axios';
import './Store.css';
import StoreHeader from './StoreHeader';

const Store = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(10); // pagination control

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://hostel-sewa-node.onrender.com/api/products');
        setProducts(response.data.data);
        setFilteredProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    handleFilterChange();
    setVisibleCount(10); // reset pagination on filter/search change
  }, [category, searchTerm]);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleFilterChange = () => {
    const filtered = products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredProducts(filtered);
  };

  const handleSortChange = (value) => {
    const sorted = [...filteredProducts];
    if (value === 'lowToHigh') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (value === 'highToLow') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (value === 'recent') {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setFilteredProducts(sorted);
  };

  // Function to get the display name for the category
  const getCategoryDisplayName = () => {
    if (category === 'all') {
      return 'All Items';
    }
    return category; // For other categories, use the category name directly
  };

  return (
    <>
      <Navbar />
      <StoreHeader/>
      <div className="store-layout">
        {/* Top bar with categories + filter */}
        <div className="top-bar">
          <div className="category-tabs">
            <span className={`tab ${category === 'all' ? 'active' : ''}`} onClick={() => setCategory('all')}>📦 All</span>
            <span className={`tab ${category === 'Furniture' ? 'active' : ''}`} onClick={() => setCategory('Furniture')}>🛏️ Furniture</span>
            <span className={`tab ${category === 'Electronics' ? 'active' : ''}`} onClick={() => setCategory('Electronics')}>🔌 Electronics</span>
            <span className={`tab ${category === 'Bathroom Essentials' ? 'active' : ''}`} onClick={() => setCategory('Bathroom Essentials')}>🚿 Bathroom</span>
            <span className={`tab ${category === 'Laundry' ? 'active' : ''}`} onClick={() => setCategory('Laundry')}>🧺 Laundry</span>
            <span className={`tab ${category === 'Kitchen Essentials' ? 'active' : ''}`} onClick={() => setCategory('Kitchen Essentials')}>🍳 Kitchen</span>
            <span className={`tab ${category === 'Decor' ? 'active' : ''}`} onClick={() => setCategory('Decor')}>🕰️ Decor</span>
          </div>
   {/* New position for the Search Bar */}
   <div className="search-filter">
        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

          <div className="filter-section">
            <select className="sort-dropdown" onChange={(e) => handleSortChange(e.target.value)}>
              <option value="highToLow">High to Low (₹)</option>
              <option value="lowToHigh">Low to High (₹)</option>
              <option value="recent">Recent</option>
            </select>
          </div>
        </div>
</div>
        {/* New position for the category heading */}
        <div className="category-heading-wrapper">
          <h2 className="heading-titles category-display-heading">{getCategoryDisplayName()}</h2>
        </div>

     
        {/* Main Section - now contains only the product grid */}
        <div className="main-section">
          <div className="product-grid">
            {filteredProducts.slice(0, visibleCount).map((product) => (
              <div
                key={product._id}
                className="product-card"
                onClick={() => handleProductClick(product._id)}
              >
                <img src={product.photo} alt={product.name} className="product-image" />
                <div style={{ padding: '10px' }}>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">₹{product.price}</p>
                  <p className="product-rating">
                    {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredProducts.length && (
            <div className="load-more-btn" onClick={() => setVisibleCount(prev => prev + 10)}>
              Load More..
            </div>
          )}
        </div>
      </div>
      <Partners />
      <Footer />
    </>
  );
};

export default Store;