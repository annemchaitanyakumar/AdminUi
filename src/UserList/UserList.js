import React from "react";
import "./UserList.css";
import "font-awesome/css/font-awesome.min.css";

function UserList({
  users,
  handleEdit,
  handleDelete,
  selectedUsers,
  handleSelect,
  handleSelectAll,
  // onDelete,
}) {
  // const handleDelete = (userId) => {
  //   onDelete(users);
  // };

  return (
    <table>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={selectedUsers.length === users.length}
              onChange={handleSelectAll}
            />
          </th>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.id}
            className={`data-row ${
              selectedUsers.includes(user.id) ? "selected" : ""
            }`}
          >
            <td>
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() => handleSelect(user.id)}
              />
            </td>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button
                className="edit-button"
                onClick={() => handleEdit(user.id)}
              >
                <i className="fa fa-pencil" />
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(user.id)}
              >
                <i className="fa fa-trash" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserList;
