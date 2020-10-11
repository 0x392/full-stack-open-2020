import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, updateBlogs }) => {
  const [showDetail, setShowDetail] = useState(true);

  const blogStyle = {
    border: "1px solid #000",
    borderRadius: ".5rem",
    marginTop: ".5rem",
    padding: ".6rem",
  };

  const showWhenShowDetail = { display: showDetail ? "" : "none" };

  const toggleShowDetail = () => setShowDetail(!showDetail);

  const handleLike = async () => {
    await blogService.like(blog);
    updateBlogs();
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      await blogService.remove(blog);
      updateBlogs();
    }
  };

  return (
    <div style={blogStyle}>
      <div className="blog-title">Title: {blog.title}</div>
      <div className="blog-author">Author: {blog.author}</div>
      <div>
        <button onClick={toggleShowDetail}>
          {!showDetail ? "Show" : "Hide"} detail
        </button>
      </div>
      <hr />
      <div style={showWhenShowDetail}>
        <h3>Detail</h3>
        <div className="blog-url">URL: {blog.url}</div>
        <div className="blog-likes">Likes: {blog.likes}</div>
        <div>
          <button onClick={handleLike}>Like</button>
        </div>
        <hr />
      </div>
      <div>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlogs: PropTypes.func.isRequired,
};

export default Blog;
