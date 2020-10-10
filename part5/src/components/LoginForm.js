import React, { useState } from "react";
import Notification from "./Notification";
import blogService from "../services/blogs";
import loginService from "../services/login";

const LoginForm = ({ message, setMessage, setUser }) => {
  const [username, setUsername] = useState("username_1");
  const [password, setPassword] = useState("password_1");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("blog-app-user", JSON.stringify(user));
      setUsername("");
      setPassword("");
      setUser(user);
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

  return (
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
};

export default LoginForm;
