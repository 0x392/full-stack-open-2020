import React, { useState } from "react";
import PropTypes from "prop-types";

const NewBlogForm = ({ createBlog, setMessage }) => {
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

      setNewBlogTitle("");
      setNewBlogAuthor("");
      setNewBlogUrl("");

      setMessage({
        type: "successful",
        content: `a new blog "${newBlogTitle}" by "${newBlogAuthor}" added`,
      });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({
        type: "unsuccessful",
        content: error.response.data.error,
      });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{" "}
          <input
            type="text"
            value={newBlogTitle}
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input
            type="text"
            value={newBlogUrl}
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </>
  );
};

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default NewBlogForm;
