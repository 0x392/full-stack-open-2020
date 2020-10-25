import React from "react";
import { useDispatch } from "react-redux";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";
import { setLoggedInUser } from "../reducers/sessionReducer";
import blogService from "../services/blogs";
import userService from "../services/users";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;
    event.persist();

    try {
      const loggedInUser = await userService.login({ username, password });

      dispatch(setLoggedInUser(loggedInUser));
      blogService.setToken(loggedInUser.token);
      window.localStorage.setItem(
        "bloglist-user",
        JSON.stringify(loggedInUser)
      );

      event.target.username.value = "";
      event.target.password.value = "";

      dispatch(setNotification("success", `Hello, ${loggedInUser.name}`));
      setTimeout(() => dispatch(clearNotification()), 3000);
    } catch (error) {
      dispatch(setNotification("error", error.response.data.message));
      setTimeout(() => dispatch(clearNotification()), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign in</h2>
      <div>
        Username <input type="text" name="username" />
      </div>
      <div>
        Password <input type="text" name="password" />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
