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
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(25000);

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

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleFilterChange = () => {
    const filtered = products.filter((product) => {
      const isCategoryMatch = category === 'all' || product.category === category;
      const isPriceMatch = product.price >= minPrice && product.price <= maxPrice;
      return isCategoryMatch && isPriceMatch;
    });
    setFilteredProducts(filtered);
  };

  const handleResetFilters = () => {
    setCategory('all');
    setMinPrice(0);
    setMaxPrice(25000);
    setFilteredProducts(products);
  };

  return (
    <>
      <Navbar />

      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0', backgroundColor: '#f4f4f4' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center' }}>Our Store</h1>
      </div>

      <div style={{ display: 'flex', padding: '20px', gap: '20px' }}>
        {/* Sidebar Filters */}
        <div style={{ width: '250px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Filters</h3>
          <label style={{ display: 'block', marginBottom: '10px' }}>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
            <option value="all">All Categories</option>
            <option value="WaterPump">Water Pump</option>
            <option value="Camera">Camera</option>
          </select>
          <label style={{ display: 'block', margin: '10px 0' }}>Price Range: ₹{minPrice} - ₹{maxPrice}</label>
          <input type="range" min="0" max="25000" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} />
          <input type="range" min="0" max="25000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
          <button onClick={handleFilterChange} style={{ margin: '10px 0', padding: '10px', backgroundColor: '#007bff', color: '#fff' }}>Apply</button>
          <button onClick={handleResetFilters} style={{ padding: '10px', backgroundColor: '#6c757d', color: '#fff' }}>Reset</button>
        </div>

        {/* Product Grid */}
        <div className="product-grid-container">
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
