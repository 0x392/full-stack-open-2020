import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [newBlogTitle, setNewBlogTitle] = useState(`title_${Date.now()}`);
  const [newBlogAuthor, setNewBlogAuthor] = useState(`author_${Date.now()}`);
  const [newBlogUrl, setNewBlogUrl] = useState(`url_${Date.now()}`);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("blog-app-user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const savedBlog = await blogService.create({
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl,
      });

      setBlogs(blogs.concat(savedBlog));
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

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("blog-app-user");
    setMessage({
      type: "successful",
      content: `${user.name} has logged out`,
    });
    setTimeout(() => setMessage(null), 3000);
    setUser(null);
    blogService.setToken(null);
  };

  if (user === null) {
    return (
      <div>
        <LoginForm
          message={message}
          setMessage={setMessage}
          setUser={setUser}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <div>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel="new blog">
        <NewBlogForm
          newBlogTitle={newBlogTitle}
          setNewBlogTitle={setNewBlogTitle}
          newBlogAuthor={newBlogAuthor}
          setNewBlogAuthor={setNewBlogAuthor}
          newBlogUrl={newBlogUrl}
          setNewBlogUrl={setNewBlogUrl}
          addBlog={addBlog}
        />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
