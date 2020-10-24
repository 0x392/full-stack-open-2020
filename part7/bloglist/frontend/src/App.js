import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageHasLoggedIn from "./components/PageHasLoggedIn";
import PageNotLoggedIn from "./components/PageNotLoggedIn";
import { initializeBlogs } from "./reducers/blogReducer";
import blogService from "./services/blogs";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(initializeBlogs(blogs)));
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("blog-app-user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch({ type: "LOGIN", data: { user } });
    }
  }, [dispatch]);

  return user !== null ? <PageHasLoggedIn /> : <PageNotLoggedIn />;
};

export default App;
