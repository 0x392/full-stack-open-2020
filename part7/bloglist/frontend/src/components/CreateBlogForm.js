import React from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";
import blogService from "../services/blogs";

const NewBlogForm = (props) => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;
    event.persist();

    try {
      const savedBlog = await blogService.create({ title, author, url });
      dispatch(createBlog(savedBlog));

      props.toggleRef.current.toggleVisibility();
      event.target.title.value = "";
      event.target.author.value = "";
      event.target.url.value = "";

      dispatch(
        setNotification("success", `A new blog "${title}" by "${author}" added`)
      );
      setTimeout(() => dispatch(clearNotification()), 3000);
    } catch (error) {
      dispatch(setNotification("error", error.response.data.message));
      setTimeout(() => dispatch(clearNotification()), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title <input type="text" name="title" />
      </div>
      <div>
        Author <input type="text" name="author" />
      </div>
      <div>
        Url <input type="text" name="url" />
      </div>
      <div>
        <button type="submit">Create</button>
      </div>
    </form>
  );
};

export default NewBlogForm;
