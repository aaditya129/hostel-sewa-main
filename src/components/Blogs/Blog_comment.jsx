// CommentForm.js
import React from 'react';
import './CommentForm.css';

const CommentForm = () => {
  return (
    <div className="comment-form-container">
      <h2 className="comment-title">Post a Comment</h2>
      <form className="comment-form">
        <div className="input-row">
          <input
            type="text"
            placeholder="Full Name*"
            className="comment-input"
            required
          />
          <input
            type="email"
            placeholder="Email*"
            className="comment-input"
            required
          />
        </div>
        <textarea
          placeholder="Your Comment*"
          className="comment-textarea"
          required
        ></textarea>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
