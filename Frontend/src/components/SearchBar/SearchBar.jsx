import React from "react"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { IoMdClose } from "react-icons/io"


const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Search"
        className="searchbar-input"
        value={value}
        onChange={onChange}
      />
      
      {value && (
        <IoMdClose
          className="searchbar-icon searchbar-icon-hover"
          onClick={onClearSearch}
        />
      )}
      
      <FaMagnifyingGlass
        className="searchbar-icon searchbar-icon-hover"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;