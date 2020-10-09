import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  const color = message.type === "successful" ? "green" : "red";
  const style = {
    border: `1px solid ${color}`,
    borderRadius: ".5rem",
    color: color,
    marginBottom: ".5rem",
    padding: ".5rem",
  };
  return <div style={style}>{message.content}</div>;
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("username_1");
  const [password, setPassword] = useState("password_1");
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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("blog-app-user", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setMessage({
        type: "successful",
        content: "Login succeeds",
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
    setUser(null);
    blogService.setToken(null);
  };

  const createNewBlog = async (event) => {
    event.preventDefault();

    try {
      const savedBlog = await blogService.create({
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl,
      });

      setBlogs(blogs.concat(savedBlog));
      setMessage({
        type: "successful",
        content: `a new blog "${newBlogTitle}" by "${newBlogAuthor}" added`,
      });
      setTimeout(() => setMessage(null), 3000);
      setNewBlogTitle("");
      setNewBlogAuthor("");
      setNewBlogUrl("");
    } catch (error) {
      setMessage({
        type: "unsuccessful",
        content: error.response.data.error,
      });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <Notification message={message} />
      <div>
        username{" "}
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password{" "}
        <input
          type="text"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  if (user === null) {
    return <div>{loginForm()}</div>;
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <div>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <h2>create new</h2>
      <form>
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
          <button onClick={createNewBlog}>create</button>
        </div>
      </form>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
