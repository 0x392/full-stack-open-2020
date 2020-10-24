import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";
import { setBlogs } from "../reducers/blogReducer";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";
import blogService from "../services/blogs";

const BlogDetail = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const match = useRouteMatch("/blogs/:id");
  const history = useHistory();

  // Waiting for data fetched from backend
  if (blogs.length === 0) return null;

  const matchedBlog = match
    ? blogs.find((blog) => blog.id === match.params.id)
    : null;

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
        setNotification(
          "successful",
          `Blog "${matchedBlog.title}" was removed!`
        )
      );
      setTimeout(() => dispatch(clearNotification()), 3000);
    }
  };

  return (
    <div className="blog">
      <div className="blog-padding">
        <h2>{matchedBlog.title}</h2>
        <div className="blog-row blog-url">
          <a href={matchedBlog.url}>{matchedBlog.url}</a>
        </div>
        <div className="blog-row blog-likes">{matchedBlog.likes} likes</div>
        <div className="blog-row blog-author">{matchedBlog.author}</div>
        <div className="blog-row">
          <button className="like" onClick={handleLike}>
            Like
          </button>
          <button className="remove" onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
