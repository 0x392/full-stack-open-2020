import React, { useState } from "react";
import PropTypes from "prop-types";

const NewBlogForm = ({ createBlog, setNotification }) => {
  const [newBlogTitle, setNewBlogTitle] = useState(`title_${Date.now()}`);
  const [newBlogAuthor, setNewBlogAuthor] = useState(`author_${Date.now()}`);
  const [newBlogUrl, setNewBlogUrl] = useState(`url_${Date.now()}`);

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      createBlog({
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl,
      });
      setNotification({
        type: "successful",
        content: `A new blog "${newBlogTitle}" by "${newBlogAuthor}" added`,
      });
      setTimeout(() => setNotification(null), 3000);
      setNewBlogTitle("");
      setNewBlogAuthor("");
      setNewBlogUrl("");
    } catch (error) {
      setNotification({
        type: "unsuccessful",
        content: error.response.data.error,
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:{" "}
          <input
            type="text"
            value={newBlogTitle}
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          Author:{" "}
          <input
            type="text"
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          Url:{" "}
          <input
            type="text"
            value={newBlogUrl}
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </>
  );
};

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
};

export default NewBlogForm;
