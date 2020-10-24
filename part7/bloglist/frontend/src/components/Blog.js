import React, { useState } from "react";

const Blog = ({ blog, idx, like, remove }) => {
  const [showDetail, setShowDetail] = useState(false);

  const toggleShowDetail = () => setShowDetail(!showDetail);

  const handleLike = () => {
    like(blog);
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      remove(blog);
    }
  };

  const blogDetail = () => (
    <>
      <hr />
      <div className="blog-padding">
        <div className="blog-row blog-url">{blog.url}</div>
        <div className="blog-row blog-likes">{blog.likes}</div>
        <div className="blog-row">
          <button onClick={handleLike}>Like</button>
        </div>
        <div className="blog-row">
          <button onClick={handleRemove} className="remove">
            Remove
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="blog">
      <div className="blog-idx">{idx + 1}</div>
      <div className="blog-padding">
        <div className="blog-row blog-title">{blog.title}</div>
        <div className="blog-row blog-author">{blog.author}</div>
        <div className="blog-row">
          <button onClick={toggleShowDetail} className="toggle-detail-button">
            {!showDetail ? "Show" : "Hide"} detail
          </button>
        </div>
      </div>
      {showDetail && blogDetail()}
    </div>
  );
};

export default Blog;
