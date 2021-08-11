import {SyntheticEvent} from "react";

import "./styles.css";
import { BiSearchAlt } from "react-icons/all";

type SearchBarPropsType = {
  handleOnSubmit: (e: SyntheticEvent) => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nameOfTheGame: string;
};

const SearchBar = ({ handleOnSubmit, handleOnChange, nameOfTheGame }: SearchBarPropsType) => (
  <>
    <input
      className="searchBar_input"
      type="text"
      placeholder="Search..."
      value={nameOfTheGame}
      onChange={handleOnChange}
    />
    {/*<button className="searchBar-btn" type="submit" onSubmit={handleOnSubmit}>
      <BiSearchAlt className="searchBar-btn-item" />
    </button>*/}
  </>
);

export default SearchBar;
