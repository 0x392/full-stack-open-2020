import React, { useState } from "react";
import blogService from "../services/blogs";

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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}{" "}
        <button onClick={toggleShowDetail}>
          {!showDetail ? "Show Detail" : "Hide"}
        </button>
      </div>
      <div style={showWhenShowDetail}>
        <ul>
          <li>URL: {blog.url}</li>
          <li>Author: {blog.author}</li>
          <li>
            Likes: {blog.likes} <button onClick={handleLike}>Like</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Blog;
