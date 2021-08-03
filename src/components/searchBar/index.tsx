import { ChangeEvent, useState } from "react";
import _ from "lodash";

import "./styles.css";
import Loader from "@/components/searchBar/loader";
import { URL } from "@/api/api";
import { BiSearchAlt } from "react-icons/all";

const SearchBar = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = _.debounce(() => setIsSearching(false), 200);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  async function getSearch() {
    try {
      const response = await URL.search(searchTerm);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSearch() {
    setIsSearching(true);
    getSearch();
    debouncedSearchTerm();
  }

  return (
    <>
      <input
        className="searchBar_input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button className="searchBar-btn" type="submit" onClick={handleSearch}>
        <BiSearchAlt className="searchBar-btn-item"/>
      </button>
      {isSearching && <Loader />}
    </>
  );
};

export default SearchBar;
