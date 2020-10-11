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
  const [notification, setNotification] = useState(null);
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

  const createBlog = async (blogObject) => {
    newBlogRef.current.toggleVisibility();
    const savedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(savedBlog));
  };

  const handleLogout = (event) => {
    window.localStorage.removeItem("blog-app-user");
    setNotification({
      type: "successful",
      content: `${user.name} has signed out`,
    });
    setTimeout(() => setNotification(null), 3000);
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
      <>
        <Notification notification={notification} />
        <LoginForm setNotification={setNotification} setUser={setUser} />
      </>
    );
  }

  return (
    <>
      <Notification notification={notification} />
      <h2>Blogs</h2>
      <div>
        <div>Signed in as {user.name}</div>
        <div>
          <button onClick={handleLogout}>Sign out</button>
        </div>
      </div>
      <Togglable buttonLabel="Create new blog" ref={newBlogRef}>
        <NewBlogForm
          createBlog={createBlog}
          setNotification={setNotification}
        />
      </Togglable>
      {sortedBlogList()}
    </>
  );
};

export default App;
