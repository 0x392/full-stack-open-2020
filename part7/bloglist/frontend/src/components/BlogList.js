import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogListItem = ({ blog, idx }) => (
  <div className="blog-list-item">
    <div className="blog-list-item-idx">{idx + 1}</div>
    <div>
      <div>{blog.title}</div>
      <div>{blog.author}</div>
      <div>
        <Link to={`/blogs/${blog.id}`}>
          <button>Show details</button>
        </Link>
      </div>
    </div>
  </div>
);

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  const compareLikes = (a, b) => b.likes - a.likes;
  const sortedBlogs = [...blogs].sort(compareLikes);

  return sortedBlogs.map((blog, idx) => (
    <BlogListItem key={blog.id} blog={blog} idx={idx} />
  ));
};

export default BlogList;
