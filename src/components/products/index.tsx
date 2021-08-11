import { SyntheticEvent, useEffect, useState } from "react";

import "./styles.css";
import useDebounce from "@/constants/useDebounce";
import { urlProducts } from "@/api/api";
import Categories from "@/components/homePage/categories";
import SearchBar from "@/components/searchBar";
import Loader from "@/components/searchBar/loader";
import { Game } from "@/components/homePage/chooseCategory";
import GameCards from "@/components/products/gameCards";
import Filter from "@/components/homePage/filter/filter";

const Products: React.FC = () => {
  const [nameOfTheGame, setNameOfTheGame] = useState("");
  const [games, setGames] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedNameOfTheGame = useDebounce(nameOfTheGame, 300);

  useEffect(() => {
    if (!nameOfTheGame) {
      const getAllGames = async () => {
        const data = await fetch(urlProducts);
        const response = await data.json();

        setGames(response);
      };

      getAllGames();
    }

    const getGames = async () => {
      setIsSearching(true);
      const data = await fetch(`${urlProducts}?title_like=${debouncedNameOfTheGame}`);
      const response = await data.json();

      setGames(response);
      setIsSearching(false);
    };

    getGames();
  }, [debouncedNameOfTheGame]);

  const handleOnSubmit = (e: SyntheticEvent) => e.preventDefault();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setNameOfTheGame(e.target.value);

  return (
    <div>
      <Categories />
      <div className="products">
        <Filter />
        <div className="products_content">
          <SearchBar handleOnSubmit={handleOnSubmit} handleOnChange={handleOnChange} nameOfTheGame={nameOfTheGame} />
          {isSearching && <Loader />}
          {debouncedNameOfTheGame.length !== 0 && games.length === 0 && (
            <div className="not-found">Nothing was found</div>
          )}
          <div className="games-wrapper">
            {games.map((game: Game) => (
              <GameCards key={game.id} {...game} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
