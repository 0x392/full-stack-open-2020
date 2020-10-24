import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogList from "./BlogList";
import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";
import Notification from "./Notification";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";
import blogService from "../services/blogs";

const PageHasLoggedIn = () => {
  const name = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  const toggleRef = useRef();

  const handleLogout = () => {
    blogService.setToken(null);
    window.localStorage.removeItem("blog-app-user");
    dispatch({ type: "LOGOUT" });

    dispatch(setNotification("successful", `${name} has signed out`));
    setTimeout(() => dispatch(clearNotification()), 3000);
  };

  return (
    <>
      <Notification />
      <h2>Blogs</h2>
      <div className="signed-in-name">Signed in as {name}</div>
      <button onClick={handleLogout} className="sign-out">
        Sign out
      </button>
      <Togglable buttonLabel="Create new blog" ref={toggleRef}>
        <NewBlogForm toggleRef={toggleRef} />
      </Togglable>
      <BlogList />
    </>
  );
};

export default PageHasLoggedIn;
