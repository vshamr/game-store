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
import CheckBox from "@/components/products/filter/sections/checkBox";
import { useParams } from "react-router-dom";
import axios from "axios";

function HomePage(): JSX.Element {
  const [newGames, setNewGames] = useState([]);
  const [nameOfGame, setNameOfGame] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [games, setGames] = useState([]);
  const debouncedNameOfTheGame = useDebounce(nameOfGame, 300);
  const params = useParams();
  const [Filters, setFilters] = useState({
    filterGenre: [],
    price: []
  });

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


  async function getProducts() {
    try {
      await urlProducts.then((response) => {
        setGames(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  axios.post("/getProducts", (req, res) => {
    console.log(req);



  const handleOnSubmit = (e: SyntheticEvent) => e.preventDefault();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setNameOfGame(e.target.value);

  const showFilteredResults = (filters) => {
    /*const variables = {
      skip: 0,
      filters: filters,
    };*/
    getProducts();
  };

  const handleFilters = (filters, category) => {
    console.log(filters);
    const newFilters = { ...Filters };

    newFilters[category] = filters;

    if (category === "price") {
    }
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  return (
    <div>
      <Categories />
      <CheckBox handleFilters={(filters) => handleFilters(filters, "filterGenre")} />
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
    </div>
  );
}

export default HomePage;
