import React, { useState } from "react";
import PropTypes from "prop-types";

const NewBlogForm = ({ addBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState(`title_${Date.now()}`);
  const [newBlogAuthor, setNewBlogAuthor] = useState(`author_${Date.now()}`);
  const [newBlogUrl, setNewBlogUrl] = useState(`url_${Date.now()}`);

  const handleSubmit = (event) => {
    event.preventDefault();

    addBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    });

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
            id="new-blog-title"
            value={newBlogTitle}
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          Author{" "}
          <input
            type="text"
            id="new-blog-author"
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          Url{" "}
          <input
            type="text"
            id="new-blog-url"
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
