import React, { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    // Should be placed before `login(..)`
    setUsername("");
    setPassword("");
    login({ username, password });
  };

  return (
    <form onSubmit={handleLogin} id="login-form">
      <h2>Sign In to the Application</h2>
      <div>
        Username{" "}
        <input
          type="text"
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password{" "}
        <input
          type="text"
          id="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">
        Sign in
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
