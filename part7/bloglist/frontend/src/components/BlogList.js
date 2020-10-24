import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Blog from "./Blog";
import { setBlogs } from "../reducers/blogReducer";
import blogService from "../services/blogs";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const compareLikes = (a, b) => b.likes - a.likes;
  const sortedBlogs = [...blogs].sort(compareLikes);

  const handleLike = async (blog) => {
    await blogService.like(blog);
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };

  const handleRemove = async (blog) => {
    await blogService.remove(blog);
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };

  return sortedBlogs.map((blog, idx) => (
    <Blog
      key={blog.id}
      blog={blog}
      idx={idx}
      like={handleLike}
      remove={handleRemove}
    />
  ));
};

export default BlogList;
