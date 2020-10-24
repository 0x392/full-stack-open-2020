import React from "react";
import { useDispatch } from "react-redux";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";
import blogService from "../services/blogs";
import userService from "../services/users";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;
    event.target.username.value = "";
    event.target.password.value = "";

    try {
      const user = await userService.login({ username, password });

      blogService.setToken(user.token);
      window.localStorage.setItem("blog-app-user", JSON.stringify(user));
      dispatch({ type: "LOGIN", data: { user } });

      dispatch(setNotification("successful", `Signed in as ${username}`));
      setTimeout(() => dispatch(clearNotification()), 3000);
    } catch (error) {
      dispatch(setNotification("unsuccessful", error.response.data.error));
      setTimeout(() => dispatch(clearNotification()), 3000);
    }
  };

  return (
    <form onSubmit={handleLogin} id="login-form">
      <h2>Sign In to the Application</h2>
      <div>
        Username <input type="text" name="username" />
      </div>
      <div>
        Password <input type="text" name="password" />
      </div>
      <button type="submit" id="login-button">
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
