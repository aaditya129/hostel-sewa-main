import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import Partners from '../Partners';
import Footer from '../Footer';
import './ProductDetail.css';
import axios from 'axios';
import esewa from '../Store/esewa.png'; // Replace with actual path

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://hostel-sewa-node.onrender.com/api/products/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error('Error fetching product:', error.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="product-detail-container">
        <section className="product-detail">
          <h2>Product Detail</h2>
          <div className="product-info">
            <img src={product.photo} alt={product.name} className="product-image" />
            <div className="product-description">
              <h3>{product.name}</h3>
              <p className="product-price">₹{product.price}</p>
              <p>{product.details}</p>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <p>Category: {product.category}</p>
              <p>Availability: {product.available ? 'Available' : 'Unavailable'}</p>
            </div>
          </div>
        </section>

        <section className="inquiry-form">
          <h2>For Inquiry</h2>
          <form>
            <div className="form-row">
              <input type="text" name="fullName" placeholder="Full Name*" required />
              <input type="text" name="address" placeholder="Address*" required />
            </div>
            <div className="form-row">
              <input type="text" name="mobile" placeholder="Mobile No.*" required />
              <input type="email" name="email" placeholder="Email Address*" required />
            </div>
            <textarea name="description" placeholder="Description" rows="4"></textarea>

            <div className="payment-methods-container">
              <h3>Select Payment Methods</h3>
              <div className="payment-methods">
                <label className={`payment-card ${selectedMethod === 'ime' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="ime"
                    checked={selectedMethod === 'ime'}
                    onChange={handleMethodChange}
                  />
                  <img src={esewa} alt="Global IME Bank" className="payment-logo" />
                  <div className="payment-info">
                    <span className="payment-name">Global IME Bank</span>
                  </div>
                </label>

                <label className={`payment-card ${selectedMethod === 'esewa' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="esewa"
                    checked={selectedMethod === 'esewa'}
                    onChange={handleMethodChange}
                  />
                  <img src={esewa} alt="eSewa" className="payment-logo" />
                  <div className="payment-info">
                    <span className="payment-name">eSewa</span>
                  </div>
                </label>
              </div>
            </div>

            <button type="submit" className="submit-button">Submit</button>
          </form>
        </section>
      </div>
      <Partners />
      <Footer />
    </>
  );
};

export default ProductDetail;
