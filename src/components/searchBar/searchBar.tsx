import "./searchBar.css";
import { ChangeEvent, useState } from "react";
import _ from "lodash";
import axios from "axios";

type SearchBarType = {
  onSearch: (search: string) => void;
};

const SearchBar = (props: SearchBarType): JSX.Element => {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const falseSearch = _.debounce(() => setIsSearching(false), 200);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  async function getSearch() {
    try {
      const response = await axios.get(`http://localhost:3000/api/search/${search}`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSearch() {
    alert("got product");
    props.onSearch(search);
    setIsSearching(true);
    getSearch();
    falseSearch();
  }

  return (
    <div className="searchBar">
      <input className="searchBar_input" type="text" placeholder="Search..." value={search} onChange={handleChange} />
      <button className="searchBar_button" type="submit" onClick={handleSearch}>
        Click
      </button>
      {isSearching && <div>Searching ...</div>}
    </div>
  );
};

export default SearchBar;
