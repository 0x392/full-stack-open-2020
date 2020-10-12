import React, { useState } from "react";
// import PropTypes from "prop-types";

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState("username_1");
  const [password, setPassword] = useState("password_1");

  const handleLogin = (event) => {
    event.preventDefault();

    // Should be placed before `login(..)`
    setUsername("");
    setPassword("");
    login({ username, password });
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
  // setNotification: PropTypes.func.isRequired,
  // setUser: PropTypes.func.isRequired,
};

export default LoginForm;
