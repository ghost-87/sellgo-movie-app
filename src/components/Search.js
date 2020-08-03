import React, { useState } from "react";
import searchIconImage from '../assets/searchIcon.png';

const Search = ({ search }) => {

  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };
 
  const callSearchFunction = e => {
    e.preventDefault();
    search(searchValue);
    resetInputField(); 
  };


  return (
    <form className="search">
      <input
        className="searchTextField"
        placeholder="      Search movies title"
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <button
        className="searchButton"
        onClick={callSearchFunction}
        type="submit" 
        value="SEARCH">
        <img alt="search icon" src={searchIconImage} className="searchIconImage"/> 
        </button>
     </form>
  );
};

export default Search;
