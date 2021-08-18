import "../products/gameCards/styles.css";
import GameCards from "@/components/products/gameCards";
import Categories from "@/components/homePage/categories";
import { SyntheticEvent, useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { urlProducts } from "@/api/api";
import SearchBar from "@/components/searchBar";
import Loader from "@/components/searchBar/loader";
import { Game } from "@/components/homePage/chooseCategory";
import NewGames from "@/components/homePage/newGames/newGames";
import Filter from "@/components/products/Filter/Filter";
const db = require("../../../db.json");

const allCategories = ["all", ...new Set(db.games.map(game => game.category))];
console.log(allCategories);

function HomePage(): JSX.Element {
  const [newGames, setNewGames] = useState([]);
  const [nameOfGame, setNameOfGame] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [games, setGames] = useState([]);
  const debouncedNameOfTheGame = useDebounce(nameOfGame, 300);

  const [buttons, setButtons] = useState(allCategories);

  const filterBtn = (button) => {
    if (button === "all") {
      setGames(games);
      return;
    }
    const filteredData = db.games.filter((game: Game) => game.category === button);
    setGames(filteredData);
  };

  useEffect(() => {
    if (!nameOfGame) {
      setGames([]);
      return;
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

  useEffect(() => {
    const getNewGames = async () => {
      const data = await fetch(`${urlProducts}?_sort=date&_order=desc`);
      const response = await data.json();

      setNewGames(response.slice(0, 3));
    };
    getNewGames();
  }, []);

  const handleOnSubmit = (e: SyntheticEvent) => e.preventDefault();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setNameOfGame(e.target.value);



  return (
    <div>
      <Categories />
      <div className="searchBar_homePage">
        <SearchBar handleOnSubmit={handleOnSubmit} handleOnChange={handleOnChange} nameOfTheGame={nameOfGame} />
      </div>
      {isSearching && <Loader />}
      {debouncedNameOfTheGame.length !== 0 && games.length === 0 && <div className="not-found">Nothing was found</div>}
      <h2 className="gameCards-top-title">
        <span>Top</span> games
      </h2>
      <div className="gameCards_container">
        {games.map((game: Game) => (
          <GameCards key={game.id} {...game} />
        ))}
      </div>
      <NewGames newGames={newGames} />
      <span>Filter</span>
      {/*<ExsButton button={buttons} filterBtn={filterBtn} />*/}

      <Filter button={buttons} filterBtn={filterBtn} />

    </div>
  );
}

export default HomePage;
