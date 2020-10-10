import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [showDetail, setShowDetail] = useState(false);

  const blogStyle = {
    border: "1px solid #000",
    borderRadius: ".5rem",
    marginTop: ".5rem",
    padding: ".6rem",
  };

  const showWhenShowDetail = { display: showDetail ? "" : "none" };

  const toggleShowDetail = () => setShowDetail(!showDetail);

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
          <li>Likes: {blog.likes} <button>Like</button></li>
        </ul>
      </div>
    </div>
  );
};

export default Blog;
