import React from "react";

const NewBlogForm = ({
  newBlogTitle,
  setNewBlogTitle,
  newBlogAuthor,
  setNewBlogAuthor,
  newBlogUrl,
  setNewBlogUrl,
  addBlog,
}) => {
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

export default NewBlogForm;
