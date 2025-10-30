import React from "react";
import styles from "./Search.module.css";
import SearchIcon from "../../assets/svg/searchBarSearchIcon.svg";
import Image from "next/image";

const Search = ({ onSearchChange }) => {
  const handleSearchInputChange = (event) => {
    onSearchChange(event.target.value);
  };
  return (
    <div className={styles.searchContainer}>
      <Image src={SearchIcon} alt="searchIcon" />
      <input
        type="text"
        placeholder="Search"
        className={styles.searchInput}
        // value={searchQuery}
        onChange={handleSearchInputChange}
      />
    </div>
  );
};

export default Search;
