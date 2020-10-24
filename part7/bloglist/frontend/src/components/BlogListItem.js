import React from "react";
import { Link } from "react-router-dom";

const BlogListItem = ({ blog, idx }) => {
  return (
    <div className="blog">
      <div className="blog-idx">{idx + 1}</div>
      <div className="blog-padding">
        <div className="blog-row blog-title">{blog.title}</div>
        <div className="blog-row blog-author">{blog.author}</div>
        <div className="blog-row">
          <Link to={`/blogs/${blog.id}`}>
            <button className="detail-button">Detail</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogListItem;
