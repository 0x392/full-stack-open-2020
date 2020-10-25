import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/LoginForm";
import MainPage from "./components/MainPage";
import Notification from "./components/Notification";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/userReducer";
import { setLoggedInUser } from "./reducers/sessionReducer";
import blogService from "./services/blogs";
import userService from "./services/users";

const App = () => {
  const session = useSelector((state) => state.session);
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(initializeBlogs(blogs)));
    userService.getAll().then((users) => dispatch(initializeUsers(users)));
  }, [dispatch]);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem("bloglist-user");
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON);
      dispatch(setLoggedInUser(loggedInUser));
      blogService.setToken(loggedInUser.token);
    }
  }, [dispatch]);

  return (
    <div id="app">
      <Notification />
      {session.user !== null ? <MainPage /> : <LoginForm />}
    </div>
  );
};

export default App;
