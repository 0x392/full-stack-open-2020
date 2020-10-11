import React, { useState } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";
import PropTypes from "prop-types";

const LoginForm = ({ setNotification, setUser }) => {
  const [username, setUsername] = useState("username_1");
  const [password, setPassword] = useState("password_1");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("blog-app-user", JSON.stringify(user));
      setNotification({
        type: "successful",
        content: `Welcome, ${username}!`,
      });
      setTimeout(() => setNotification(null), 3000);
      setUsername("");
      setPassword("");
      setUser(user);
    } catch (error) {
      setNotification({
        type: "unsuccessful",
        content: error.response.data.error,
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Sign In to the Application</h2>
      <div>
        Username{" "}
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password{" "}
        <input
          type="text"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Sign in</button>
    </form>
  );
};

LoginForm.propTypes = {
  setNotification: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;
