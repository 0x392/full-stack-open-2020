import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserRow = ({ user }) => (
  <tr>
    <td>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </td>
    <td>{user.blogs.length}</td>
  </tr>
);

const UsersTable = () => {
  const users = useSelector((state) => state.users);

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Blogs Created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
