import React from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";
import blogService from "../services/blogs";

const NewBlogForm = (props) => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;
    event.target.title.value = "";
    event.target.author.value = "";
    event.target.url.value = "";

    try {
      const savedBlog = await blogService.create({ title, author, url });
      dispatch(createBlog(savedBlog));

      dispatch(
        setNotification(
          "successful",
          `A new blog "${title}" by "${author}" added`
        )
      );
      setTimeout(() => dispatch(clearNotification()), 3000);

      props.toggleRef.current.toggleVisibility();
    } catch (error) {
      dispatch(setNotification("unsuccessful", error.response.data.error));
      setTimeout(() => dispatch(clearNotification()), 3000);
    }
  };

  return (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title <input type="text" id="new-blog-title" name="title" />
        </div>
        <div>
          Author <input type="text" id="new-blog-author" name="author" />
        </div>
        <div>
          Url <input type="text" id="new-blog-url" name="url" />
        </div>
        <div>
          <button type="submit" id="create-new-blog-button">
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default NewBlogForm;
