import "./searchBar.css";
import { ChangeEvent, useState } from "react";
import _ from "lodash";
import Loader from "@/components/searchBar/loader/loader";
import { URL } from "@/api/api";

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
    <div className="searchBar">
      <input
        className="searchBar_input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button className="searchBar_button" type="submit" onClick={handleSearch}>
        Search
      </button>
      {isSearching && <Loader />}
    </div>
  );
};

export default SearchBar;
