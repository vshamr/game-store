import "../products/gameCards/styles.css";
import GameCards from "@/components/products/gameCards";
import Categories from "@/components/homePage/categories";
import { GAME_CARDS_DATA } from "@/constants/data";
import NewGames from "@/components/products/games";
import { SyntheticEvent, useEffect, useState } from "react";
import { urlProducts } from "@/api/api";
import useDebounce from "@/constants/useDebounce";
import SearchBar from "@/components/searchBar";
import Loader from "@/components/searchBar/loader";

function HomePage(): JSX.Element {
  const [nameOfGame, setNameOfGame] = useState("");
  const [games, setGames] = useState([]);
  const [newGames, setNewGames] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedNameOfTheGame = useDebounce(nameOfGame, 300);

  useEffect(() => {
    if (!nameOfGame) {
      setGames([]);
      return;
    }

    const getGames = async () => {
      setIsSearching(true);
      const data = await fetch(urlProducts + (`?title_like=${debouncedNameOfTheGame}`));
      const response = await data.json();

      setGames(response);
      setIsSearching(false);
    };

    getGames();

  }, [debouncedNameOfTheGame]);

  useEffect(() => {
    const getNewGames = async () => {
      const data = await fetch(urlProducts + "?_sort=date&_order=desc");
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
      <SearchBar handleOnSubmit={handleOnSubmit} handleOnChange={handleOnChange} nameOfTheGame={nameOfGame} />
      {isSearching && <Loader />}
      {(debouncedNameOfTheGame.length !== 0 && games.length === 0) &&
      <div className="not-found">Nothing was found</div>}

      <h2 className="gameCards-top-title"><span>Top</span> games</h2>
      <div className="gameCards_container">
        {GAME_CARDS_DATA.map(({ img, title, price, description }) => (
          <GameCards img={img} title={title} price={price} description={description} />
        )
        }
      </div>
      <NewGames newGames={newGames} />
    </div>
  );
}

export default HomePage;
