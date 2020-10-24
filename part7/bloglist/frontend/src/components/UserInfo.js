import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";

const UserInfo = () => {
  const userList = useSelector((state) => state.userList);
  const match = useRouteMatch("/users/:id");

  // Waiting for data fetched from backend
  if (userList.length === 0) return null;

  const matchedUser = match
    ? userList.find((user) => user.id === match.params.id)
    : null;

  return (
    <div>
      <h2>{matchedUser.name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {matchedUser.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserInfo;
