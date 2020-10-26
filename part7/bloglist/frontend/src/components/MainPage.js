import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import BlogDetails from "./BlogDetails";
import BlogList from "./BlogList";
import CreateBlogForm from "./CreateBlogForm";
import Togglable from "./Togglable";
import UserDetails from "./UserDetails";
import UsersTable from "./UsersTable";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";
import { setLoggedInUser } from "../reducers/sessionReducer";
import blogService from "../services/blogs";

const Navigation = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(setLoggedInUser(null));
    blogService.setToken(null);
    window.localStorage.removeItem("bloglist-user");

    history.push("/");

    dispatch(setNotification("success", `${user.name} has logged out`));
    setTimeout(() => dispatch(clearNotification()), 3000);
  };

  return (
    <nav>
      <div>
        <ul>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
      <div>Logged in as {user.name}</div>
    </nav>
  );
};

const MainPage = () => {
  const user = useSelector((state) => state.session.user);
  const toggleRef = useRef();

  return (
    <>
      <Navigation user={user} />
      <Switch>
        <Route path="/blogs/:id">
          <BlogDetails />
        </Route>
        <Route path="/users/:id">
          <UserDetails />
        </Route>
        <Route path="/users">
          <header>Users</header>
          <main>
            <UsersTable />
          </main>
        </Route>
        <Route path="/">
          <header>Blogs</header>
          <main>
            <h3>Create a Blog</h3>
            <div className="main-row">
              <Togglable buttonLabel="Create a blog" ref={toggleRef}>
                <CreateBlogForm toggleRef={toggleRef} />
              </Togglable>
            </div>
            <hr />
            <BlogList />
          </main>
        </Route>
      </Switch>
    </>
  );
};

export default MainPage;
