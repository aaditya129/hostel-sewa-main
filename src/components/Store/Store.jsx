import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Partners from '../Partners';
import Footer from '../Footer';
import axios from 'axios';
import './Store.css';

const Store = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('all');

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
  }, [category]);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleFilterChange = () => {
    const filtered = products.filter((product) => {
      return category === 'all' || product.category === category;
    });
    setFilteredProducts(filtered);
  };

  return (
    <>
      <Navbar />
     
      <div className="store-layout">
        {/* Sidebar */}
        
        <aside className="sidebar">
        <h1 className='stores'>Our Store</h1>
  {/* Sticky Filter Dropdown */}
  <div className="filter-top-bar">
    <span className="filter-label">Add Filter</span>
    <select
      className="sort-dropdown"
      onChange={(e) => {
        const value = e.target.value;
        const sorted = [...filteredProducts];
        if (value === 'lowToHigh') {
          sorted.sort((a, b) => a.price - b.price);
        } else if (value === 'highToLow') {
          sorted.sort((a, b) => b.price - a.price);
        } else if (value === 'recent') {
          sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        setFilteredProducts(sorted);
      }}
    >
      <option value="highToLow">High to Low (₹)</option>
      <option value="lowToHigh">Low to High (₹)</option>
      <option value="recent">Recent</option>
    </select>
  </div>

  <h3>Categories</h3>
  <ul>
    <li onClick={() => setCategory('all')}>📦 All</li>
    <li onClick={() => setCategory('Furniture')}>🛏️ Furniture</li>
    <li onClick={() => setCategory('Electronics')}>🔌 Electronics</li>
    <li onClick={() => setCategory('Bathroom Essentials')}>🚿 Bathroom</li>
    <li onClick={() => setCategory('Laundry')}>🧺 Laundry</li>
    <li onClick={() => setCategory('Kitchen Essentials')}>🍳 Kitchen</li>
    <li onClick={() => setCategory('Decor')}>🕰️ Decor</li>
  </ul>
</aside>

        {/* Main Section */}
        <div className="main-section">
          <h2>Trending</h2>
 

          <div className="trending-scroll">
            {filteredProducts.slice(0, 16).map((product) => (
              <div
                key={product._id}
                className="trending-card"
                onClick={() => handleProductClick(product._id)}
              >
                <img src={product.photo} alt={product.name} />
                <p className="name">{product.name}</p>
                <p className="price">₹ {product.price}</p>
              </div>
            ))}
          </div>

          <h2 className="heading-titles">Available Products</h2>
          <div className="product-grid">
            {filteredProducts.map((product) => (
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
        </div>
      </div>
      <Partners />
      <Footer />
    </>
  );
};

export default Store;
