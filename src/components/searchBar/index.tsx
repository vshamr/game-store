import "./styles.css";

type SearchBarPropsType = {
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nameOfTheGame: string;
};

const SearchBar = ({ handleOnChange, nameOfTheGame }: SearchBarPropsType) => (
  <input
    className="searchBar_input"
    type="text"
    placeholder="Search..."
    value={nameOfTheGame}
    onChange={handleOnChange}
  />
);

export default SearchBar;
