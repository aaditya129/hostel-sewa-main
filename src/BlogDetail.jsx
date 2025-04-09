import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./BlogDetail.css";
import CommentForm from "./components/Blogs/Blog_comment";

const BlogDetail = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`https://hostel-sewa-node.onrender.com/api/blogs/${blogId}`);
      setBlog(response.data.blog);
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="blog-detail-container">
        {loading ? (
          <div className="loading-message">Loading...</div>
        ) : blog ? (
          <div className="blog-detail">
            <img src={blog.image} alt={blog.title} className="blog-detail-image" />
            <h1 className="blog-title">{blog.title}</h1>
            <h3 className="blog-author">By {blog.author}</h3>
            <p className="blog-date">{new Date(blog.createdAt).toDateString()}</p>
            <p className="blog-content">{blog.content}</p>

            <Link  to="/blog">
              <button style={{marginBottom:"5px"}} className="back-button">Back to Blogs</button>
            </Link>
            <CommentForm/>
          </div>
        ) : (
          <h2 className="error-message">Blog not found.</h2>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BlogDetail;
