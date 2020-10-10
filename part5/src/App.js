import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const newBlogRef = useRef();

  const getAllBlogs = () =>
    blogService.getAll().then((blogs) => setBlogs(blogs));

  useEffect(() => {
    getAllBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("blog-app-user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async (blogObject) => {
    newBlogRef.current.toggleVisibility();
    const savedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(savedBlog));
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

  const sortedBlogList = () => {
    const compareLikes = (a, b) => b.likes - a.likes;

    const sortedBlog = [...blogs].sort(compareLikes);
    return sortedBlog.map((blog) => (
      <Blog key={blog.id} blog={blog} updateBlogs={getAllBlogs} />
    ));
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
      <Togglable buttonLabel="new blog" ref={newBlogRef}>
        <NewBlogForm
          createBlog={addBlog}
          message={message}
          setMessage={setMessage}
        />
      </Togglable>
      {sortedBlogList()}
    </div>
  );
};

export default App;
