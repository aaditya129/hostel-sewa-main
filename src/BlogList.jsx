// BlogList.js
import React from 'react';
import { Link } from 'react-router-dom';
import './BlogList.css';
import mainImage from './assets/photo1.png'; // Replace with actual image paths

// Sample blog data (you can replace this with actual data or fetch it from an API)
const blogs = [
  {
    id: 1,
    category: "Hostel Sewa",
    title: "Nepal Hostel Association 6th Meet",
    date: "April 1, 2024",
    description: "Short description for the 6th meet...",
    image: mainImage,
  },
  {
    id: 2,
    category: "Online Khabar",
    title: "Hostel Monitor By Sub-metro Itahari",
    date: "March 27, 2024",
    description: "Short description for hostel monitoring...",
    image: mainImage,
  },
  {
    id: 3,
    category: "HarmoMart",
    title: "Better Hostel Management By Kathmandu Metro",
    date: "March 20, 2024",
    description: "Short description for better hostel management...",
    image: mainImage,
  },
];

const BlogList = () => {
  return (
    <div className="blog-list">
      <h2 className="blog-title">Blogs</h2>
      {blogs.map((blog) => (
        <Link to={`/blogs/${blog.id}`} key={blog.id} className="blog-card">
          <img src={blog.image} alt={blog.title} className="blog-card-image" />
          <div className="blog-card-content">
            <span className="blog-category">{blog.category}</span>
            <h3 className="blog-title">{blog.title}</h3>
            <p className="blog-date">{blog.date}</p>
            <p className="blog-description">{blog.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogList;
