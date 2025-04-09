import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Navbar";
import Partners from "../Partners";
import Footer from "../Footer";
import "./Blogs_home.css";

const Blogs_home = () => {
  const [blogs, setBlogs] = useState([]);
  const [latestBlog, setLatestBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("https://hostel-sewa-node.onrender.com/api/blogs");
      const sortedBlogs = response.data.blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setLatestBlog(sortedBlogs.length > 0 ? sortedBlogs[0] : null);
      console.log(response.data.blogs)
      setBlogs(sortedBlogs.slice(1)); // Store all except the latest one
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Navbar />

      <motion.div
        className="blog-section"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.section className="blog-title" variants={cardVariants}>
          Blogs
        </motion.section>

        {/* ✅ Latest Blog on Top */}
        {latestBlog && (
  <Link to={`/blogs/${latestBlog._id}`} style={{ textDecoration: "none", color: "inherit" }}>
    <motion.div
      className="main-blog-card"
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        transition: { duration: 0.3 },
      }}
      variants={cardVariants}
    >
      <img
        src={latestBlog.image}
        alt={latestBlog.title}
        className="main-blog-image"
      />
      <div className="main-blog-content">
        <span className="blog-category">{latestBlog.author || "Hostel Sewa"}</span>
        <h3 className="blog-main-title">{latestBlog.title}</h3>
        <p className="blog-date">{new Date(latestBlog.createdAt).toDateString()}</p>
        <p className="blog-description">{latestBlog.content.substring(0, 150)}...</p>
      </div>
    </motion.div>
  </Link>
)}


        {/* ✅ Rest of the Blogs Mapped Below */}
        <motion.div className="small-blog-grid" variants={containerVariants}>
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              className="small-blog-card"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                transition: { duration: 0.3 },
              }}
              variants={cardVariants}
            >
              <Link to={`/blogs/${blog._id}`}>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="small-blog-image"
                />
                <div className="small-blog-content">
                  <span className="blog-category">{blog.author || "General"}</span>
                  <p className="blog-date">{new Date(blog.createdAt).toDateString()}</p>
                  <h4 className="blog-title">{blog.title}</h4>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      

      <Partners />
      <Footer />
    </>
  );
};

export default Blogs_home;
