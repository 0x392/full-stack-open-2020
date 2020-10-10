import React, { useState } from "react";
import blogService from "../services/blogs";

const NewNoteForm = ({ blogs, setBlogs, setMessage }) => {
  const [title, setTitle] = useState(`title_${Date.now()}`);
  const [author, setAuthor] = useState(`author_${Date.now()}`);
  const [url, setUrl] = useState(`url_${Date.now()}`);

  const createNewBlog = async (event) => {
    event.preventDefault();

    try {
      const savedBlog = await blogService.create({ title, author, url });

      setBlogs(blogs.concat(savedBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
      setMessage({
        type: "successful",
        content: `a new blog "${title}" by "${author}" added`,
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
      <form>
        <div>
          title:{" "}
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <button onClick={createNewBlog}>create</button>
        </div>
      </form>
    </>
  );
};

export default NewNoteForm;
