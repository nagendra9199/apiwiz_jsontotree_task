import React, { useState } from "react";

const SearchBar = ({ setSearchPath }) => {
  const [value, setValue] = useState("");

  return (
    <div className="search-bar-wrapper">
      <div className="search-bar">
        <input
          className="search-input"
          placeholder="Enter JSON path e.g. $.user.address.city"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={() => setSearchPath(value)}
          className="search-button"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
