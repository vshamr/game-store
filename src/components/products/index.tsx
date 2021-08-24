import { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";

import "./styles.css";
import useDebounce from "@/hooks/useDebounce";
import Categories from "@/components/homePage/categories";
import SearchBar from "@/components/searchBar";
import Loader from "@/components/searchBar/loader";
import GameCards from "@/components/products/gameCards";
import Filter from "@/components/products/Filter/filter";
import { ParamsAges, ParamsCategory, ParamsGenres } from "@/components/products/Filter/filterData";

function getRequestUrl(genre: string, age: string | number, category: string, searchingText: string) {
  let location = "http://localhost:3000/games?";

  if (genre !== ParamsGenres.ALL) {
    location += `genre_like=${genre}`;
  }
  if (age !== ParamsAges.ALL) {
    location += location === "http://localhost:3000/games?" ? `age_like=${age}` : `&&age_like=${age}`;
  }
  if (category !== ParamsCategory.ALL) {
    location +=
      location === "http://localhost:3000/games?" ? `category_like=${category}` : `&&category_like=${category}`;
  }
  if (searchingText) {
    location +=
      location === "http://localhost:3000/games?" ? `title_like=${searchingText}` : `&&title_like=${searchingText}`;
  }

  return location;
}

const Products: React.FC = () => {
  const [searchingText, setSearchingText] = useState("");
  const [games, setGames] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [genre, setGenre] = useState<ParamsGenres>(ParamsGenres.ALL);
  const [age, setAge] = useState<ParamsAges>(ParamsAges.ALL);
  const [category, setCategory] = useState<ParamsCategory>(ParamsCategory.ALL);

  const debouncedNameOfTheGame = useDebounce(searchingText, 300);

  useEffect(() => {
    (async () => {
      setIsSearching(true);
      const { data } = await axios.get(getRequestUrl(genre, age, category, searchingText));
      setGames(data);
      setIsSearching(false);
    })();
  }, [debouncedNameOfTheGame]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(getRequestUrl(genre, age, category, searchingText));
      setGames(data);
    })();
  }, [genre, age, category]);

  const handleOnSubmit = (e: SyntheticEvent) => e.preventDefault();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchingText(e.target.value);

  return (
    <div>
      <Categories />
      <div className="products">
        <Filter setGenre={setGenre} setAge={setAge} setCategory={setCategory} />
        <div className="products_container">
          <SearchBar handleOnSubmit={handleOnSubmit} handleOnChange={handleOnChange} nameOfTheGame={searchingText} />
          {isSearching && <Loader />}
          {debouncedNameOfTheGame.length !== 0 && games.length === 0 && (
            <div className="not-found">Nothing was found</div>
          )}
          <div className="games-wrapper">
            {games.map((game) => (
              <GameCards key={game.id} game={game} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
