import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getFilteredGames } from "@/redux/reducer";
import GameCards from "@/components/products/gameCards";
import { Game } from "@/components/homePage/chooseCategory";

const FilterWithRedux: React.FunctionComponent = (props) => {
  const dispatch = useDispatch();

  const [games, setGames] = useState([]);

  async function getProducts() {
    try {
      await URL.getGames().then((response) => {
        setGames(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);

  /*
  const sortByRating = () => {
    const result = products.sort((a, b) => (a.rating > b.rating ? -1 : 1));
    return dispatch(getFilteredGames(result));
  };

  const sortByPrice = () => {
    const result = products.sort((a, b) => (a.price > b.price ? -1 : 1));
    return dispatch(getFilteredGames(result));
  }; */

  /*  const filterByCategory = (value) => {
    if (value === "All") {
      dispatch(getFilteredGames(products.filter((game) => game.genre)));
    } else if (value === "PC") {
      dispatch(getFilteredGames(products.filter((game) => game.genre == "PC")));
    } else if (value === "Xbox") {
      dispatch(getFilteredGames(products.filter((game) => game.genre == "Xbox")));
    } else if (value === "Playstation") {
      dispatch(getFilteredGames(products.filter((game) => game.genre == "Playstation")));
    }
  }; */

  const filterByGenre = (value: string) => {
    if (value === "all") {
      dispatch(getFilteredGames(games.filter((game) => game.genre)));
    } else if (value === "Shooter") {
      dispatch(getFilteredGames(games.filter((game) => game.genre === "Shooter")));
    } else if (value === "Strategy") {
      dispatch(getFilteredGames(games.filter((game) => game.genre === "Strategy")));
    } else if (value === "Fighting") {
      dispatch(getFilteredGames(games.filter((game) => game.genre === "Fighting")));
    } else if (value === "Racing") {
      dispatch(getFilteredGames(games.filter((game) => game.genre === "Racing")));
    }
  };
  const filterByAge = (value: string) => {
    if (value === "all") {
      dispatch(getFilteredGames(games.filter((game) => game.age)));
    } else if (value === "6+") {
      dispatch(getFilteredGames(games.filter((game) => game.age === "6+")));
    } else if (value === "12+") {
      dispatch(getFilteredGames(games.filter((game) => game.age === "12+")));
    } else if (value === "16+") {
      dispatch(getFilteredGames(games.filter((game) => game.age === "16+")));
    } else if (value === "18+") {
      dispatch(getFilteredGames(games.filter((game) => game.age === "18+")));
    }
  };

  return (
    <div className="filter_container">
      <div>
        <div>
          <p>Genres</p>
          <ul className="products-page__selection-list">
            <li>
              <input name="genreFilter" type="radio" onChange={() => filterByGenre("all")} />
              <span className="products-page__selectors">All</span>
              {games.map((game: Game) => (
                <GameCards key={game.id} {...game} />
              ))}
            </li>

            <li>
              <input name="genreFilter" type="radio" onChange={() => filterByGenre("Racing")} />
              <span className="products-page__selectors">Racing</span>
            </li>

            <li>
              <input name="genreFilter" type="radio" onChange={() => filterByGenre("Strategy")} />
              <span className="products-page__selectors">Strategy</span>
            </li>

            <li>
              <input name="genreFilter" type="radio" onChange={() => filterByGenre("Fighting")} />
              <span className="products-page__selectors">Fighting</span>
            </li>
          </ul>
        </div>

        <div className="products-page__selection">
          <p className="products-page__title">Age</p>
          <ul className="products-page__selection-list">
            <li>
              <input name="ageFilter" type="radio" onChange={() => filterByAge("all")} />
              <span className="products-page__selectors">All</span>
            </li>
            <li>
              <input name="ageFilter" type="radio" onChange={() => filterByAge("6+")} />
              <span className="products-page__selectors">6 +</span>
            </li>

            <li>
              <input name="ageFilter" type="radio" onChange={() => filterByAge("12+")} />
              <span className="products-page__selectors">12 +</span>
            </li>
            <li>
              <input name="ageFilter" type="radio" onChange={() => filterByAge("18+")} />
              <span className="products-page__selectors">18 +</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="products-page__search">
        <div className="catalog">{props.filterByPlatform}</div>
      </div>
    </div>
  );
};

export default FilterWithRedux;
