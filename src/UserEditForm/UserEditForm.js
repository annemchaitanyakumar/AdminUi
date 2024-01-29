import React, { useEffect, useState } from "react";
import "./UserEditForm.css";

function UserEditForm({ user, handleUpdate, inputRef }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const handleSave = () => {
    const updatedUser = { ...user, name, email, role };
    handleUpdate(updatedUser);
  };

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setRole(user.email);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [user, inputRef]);

  return (
    <div className="edit-form">
      <h2 id="edit-user">Edit User</h2>
      <div>
        <p className="edit-name">Re-Enter your Name</p>
        <input
          className="edit-input"
          type="text"
          placeholder={(e) => setName(e.target.value)}
          value={name}
          onChange={(e) => setName(e.target.value)}
          ref={inputRef}
        />
      </div>

      <div>
        <p className="edit-name">Re-Enter your Email</p>
        <input
          className="edit-input"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <p className="edit-name">Change your Role</p>
        <input
          className="edit-input"
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>

      <button className="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export default UserEditForm;
