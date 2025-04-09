import React, { useEffect, useState } from 'react';
import './Post.css';
import Navigate from './Navigate/Navigate';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LatestPosts = ({ blog }) => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('https://hostel-sewa-node.onrender.com/api/blogs');
        const sortedBlogs = res.data.blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBlogs(sortedBlogs);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="latest-posts-section">
      <div className="header">
        <h2>Latest Posts</h2>
        <button onClick={blog} className="view-all-btn">View all blogs</button>
      </div>

      <div className="posts-container">
        {/* Main Post */}
        {blogs[0] && (
          <div className="main-post" onClick={() => navigate(`/blogs/${blogs[0]._id}`)} style={{ cursor: 'pointer' }}>
            <img src={blogs[0].image} alt="Main Post" className="main-post-image" />
            <div className="main-post-content">
              <p className="post-meta">{blogs[0].author} | {new Date(blogs[0].createdAt).toLocaleDateString()}</p>
              <h3 className="post-title">{blogs[0].title}</h3>
            </div>
          </div>
        )}

        {/* Side Posts */}
        <div className="side-posts">
          {blogs.slice(1, 4).map((post) => (
            <div
              className="side-post"
              key={post._id}
              onClick={() => navigate(`/blogs/${post._id}`)}
              style={{ cursor: 'pointer' }}
            >
              <img src={post.image} alt={post.title} className="side-post-image" />
              <div className="side-post-content">
                <p className="post-meta">{post.author} | {new Date(post.createdAt).toLocaleDateString()}</p>
                <h4 className="side-post-title">{post.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gap"></div>
    </div>
  );
};

export default Navigate(LatestPosts);
