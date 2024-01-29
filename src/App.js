import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";
import UserList from "./UserList/UserList";
import Pagination from "./Pagination/Pagination";
import SearchBar from "./SearchBar/SearchBar";
import UserEditForm from "./UserEditForm/UserEditForm";
import "font-awesome/css/font-awesome.min.css";

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isEditFormVisible, setEditFormVisibility] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  //handling the page changes
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  //searching in text field handling
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to the first page when searching
  };

  //handling the updating of the users
  const handleUpdate = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  //handling the edit function
  const handleEdit = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);
    setSelectedUser(userToEdit);
    setEditFormVisibility(true); //to display the edit form on the ui

    // Focus the input element when the edit form is shown
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  //delete function for particular row
  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  //selecting the users clicking checkbox
  const handleSelect = (userId) => {
    // Check if the user is already selected
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  //deletes the users who are selected
  const handleDeleteSelected = () => {
    const updatedUsers = users.filter(
      (user) => !selectedUsers.includes(user.id)
    );
    setUsers(updatedUsers);
    setSelectedUsers([]); // Clear the selected users after deletion
  };

  //handling the users selecting all
  const handleSelectAll = () => {
    if (selectedUsers.length === currentUsers.length) {
      // Deselect all rows
      setSelectedUsers([]);
    } else {
      // Select all rows on the current page
      const pageUserIds = currentUsers.map((user) => user.id);
      setSelectedUsers(pageUserIds);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage; // represents the index of the last user to be displayed on the current page
  const indexOfFirstUser = indexOfLastUser - usersPerPage; //represents the index of the first user to be displayed on the current page
  const filteredUsers = users.filter(
    //new array that contains the users from the original users array
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //subset of filteredUsers that represents the users to be displayed on the current page
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="App">
      <h1>ADMIN UI</h1>
      <SearchBar handleSearch={handleSearch} />
      <UserList
        users={currentUsers}
        handleEdit={handleEdit}
        handleDelete={handleDelete} // Pass the delete function
        selectedUsers={selectedUsers} // Pass the selected users
        handleSelect={handleSelect} // Pass the select function
        handleSelectAll={handleSelectAll}
        inputRef={inputRef}
      />
      {selectedUsers.length > 0 && (
        <button
          className="delete-selected-button"
          onClick={handleDeleteSelected}
        >
          Delete Selected
        </button>
      )}

      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={filteredUsers.length}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      {isEditFormVisible && selectedUser && (
        <div className="modal" tabIndex="-1" ref={inputRef}>
          <div className="modal-content">
            <UserEditForm
              user={selectedUser}
              handleUpdate={handleUpdate}
              inputRef={inputRef}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
