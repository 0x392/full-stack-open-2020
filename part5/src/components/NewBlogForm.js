import React, { useState } from "react";
import PropTypes from "prop-types";

const NewBlogForm = ({ addBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState(`title_${Date.now()}`);
  const [newBlogAuthor, setNewBlogAuthor] = useState(`author_${Date.now()}`);
  const [newBlogUrl, setNewBlogUrl] = useState(`url_${Date.now()}`);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await addBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    });

    // Should be placed before `addBlog(..)`?
    setNewBlogTitle("");
    setNewBlogAuthor("");
    setNewBlogUrl("");
  };

  return (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title{" "}
          <input
            type="text"
            value={newBlogTitle}
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          Author{" "}
          <input
            type="text"
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          Url{" "}
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
  addBlog: PropTypes.func.isRequired,
};

export default NewBlogForm;
