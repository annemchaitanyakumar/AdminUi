import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ handleSearch }) {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    handleSearch(search);
  };

  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        placeholder="Search by Name or Email"
        value={search}
        onChange={handleChange}
      />
      <button className="search-button" onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
