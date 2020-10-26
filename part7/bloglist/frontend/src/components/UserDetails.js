import React from "react";
import { useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";

const UserDetails = () => {
  const users = useSelector((state) => state.users);
  const match = useRouteMatch("/users/:id");

  // Waiting for data fetched from the backend
  if (users.length === 0) return null;

  const matchedUser = users.find((user) => user.id === match.params.id);
  if (!matchedUser) return <div>Error: User not found</div>;

  return (
    <>
      <header>User: {matchedUser.name}</header>
      <main>
        <h3>Added Blogs</h3>
        <ul>
          {matchedUser.blogs.map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default UserDetails;
