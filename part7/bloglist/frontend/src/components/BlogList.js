import React from "react";
import { useSelector } from "react-redux";
import BlogListItem from "./BlogListItem";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  const compareLikes = (a, b) => b.likes - a.likes;
  const sortedBlogs = [...blogs].sort(compareLikes);

  return sortedBlogs.map((blog, idx) => (
    <BlogListItem key={blog.id} blog={blog} idx={idx} />
  ));
};

export default BlogList;
