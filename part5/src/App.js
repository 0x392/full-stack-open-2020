import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const newBlogRef = useRef();

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

  const handleLogin = async (credential) => {
    try {
      const user = await loginService.login(credential);

      setNotification({
        type: "successful",
        content: `Signed in as ${credential.username}`,
      });
      setTimeout(() => setNotification(null), 3000);

      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("blog-app-user", JSON.stringify(user));
    } catch (error) {
      setNotification({
        type: "unsuccessful",
        content: error.response.data.error,
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleLogout = () => {
    setNotification({
      type: "successful",
      content: `${user.name} has signed out`,
    });
    setTimeout(() => setNotification(null), 3000);

    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem("blog-app-user");
  };

  const handleLike = async (blog) => {
    await blogService.like(blog);
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  // Remove blog
  const handleRemove = async (blog) => {
    await blogService.remove(blog);
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  const addBlog = async (blogObject) => {
    // newBlogRef.current.toggleVisibility();

    try {
      const savedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(savedBlog));

      setNotification({
        type: "successful",
        content: `A new blog "${blogObject.title}" by "${blogObject.author}" added`,
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setNotification({
        type: "unsuccessful",
        content: error.response.data.error,
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const sortedBlogs = () => {
    const compareLikes = (a, b) => b.likes - a.likes;
    const sortedBlogs = [...blogs].sort(compareLikes);

    return sortedBlogs.map((blog, idx) => (
      <Blog
        key={blog.id}
        blog={blog}
        idx={idx}
        like={handleLike}
        remove={handleRemove}
      />
    ));
  };

  if (user === null) {
    return (
      <>
        <Notification notification={notification} />
        <LoginForm login={handleLogin} />
      </>
    );
  }

  return (
    <>
      <Notification notification={notification} />
      <h2>Blogs</h2>
      <div className="signed-in-name">Signed in as {user.name}</div>
      <button onClick={handleLogout} className="sign-out">
        Sign out
      </button>
      <Togglable buttonLabel="Create new blog" ref={newBlogRef}>
        <NewBlogForm addBlog={addBlog} />
      </Togglable>
      <div>{sortedBlogs()}</div>
    </>
  );
};

export default App;
