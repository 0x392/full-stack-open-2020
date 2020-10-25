import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import Comments from "./Comments";
import { setBlogs } from "../reducers/blogReducer";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";
import blogService from "../services/blogs";

const BlogDetails = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const match = useRouteMatch("/blogs/:id");
  const history = useHistory();

  // Waiting for data fetched from the backend
  if (blogs.length === 0) return null;

  const matchedBlog = blogs.find((blog) => blog.id === match.params.id);
  if (!matchedBlog) return <div>Error: Blog not found</div>;

  const handleLike = async () => {
    await blogService.like(matchedBlog);
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };

  const handleRemove = async () => {
    const confirmMessage = `Remove blog "${matchedBlog.title}" by ${matchedBlog.author}?`;
    if (window.confirm(confirmMessage)) {
      history.push("/");

      await blogService.remove(matchedBlog);
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));

      dispatch(
        setNotification("success", `Blog "${matchedBlog.title}" was removed`)
      );
      setTimeout(() => dispatch(clearNotification()), 3000);
    }
  };

  return (
    <div>
      <h2>Blog: {matchedBlog.title}</h2>
      <div>
        <a href={matchedBlog.url}>{matchedBlog.url}</a>
      </div>
      <div>{matchedBlog.likes} likes</div>
      <div>{matchedBlog.author}</div>
      <div>
        <button onClick={handleLike}>Like</button>
        <button onClick={handleRemove}>Remove</button>
      </div>
      <Comments blog={matchedBlog} />
    </div>
  );
};

export default BlogDetails;
