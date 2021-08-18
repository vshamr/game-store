import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getFilteredGames } from "@/redux/reducer";
import { Game } from "@/components/homePage/chooseCategory";
import { Dropdown } from "semantic-ui-react";

type FilterPropsType = {
  title: string;
  filterByPlatform: [];
};

const FilterRedux = (props: FilterPropsType) => {
  const dispatch = useDispatch();

  const sortingOptions = [
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" },
  ];

  const [games, setGames] = useState([]);
  const [type, setType] = useState("ascending");

  const changeType = (e: any): void => {
    setType(e.target.value);
  };

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

  const sortByRatingAsc = () => {
    const result = games.sort((a, b) => (a.rating > b.rating ? -1 : 1));
    return dispatch(getFilteredGames(result));
  };

  const sortByRatingDesc = () => {
    const result = games.sort((a, b) => (a.rating > b.rating ? 1 : -1));
    return dispatch(getFilteredGames(result));
  };

  const sortByPriceAsc = () => {
    const result = games.sort((a, b) => (a.price > b.price ? -1 : 1));
    return dispatch(getFilteredGames(result));
  };

  const sortByPriceDesc = () => {
    const result = games.sort((a, b) => (a.price > b.price ? 1 : -1));
    return dispatch(getFilteredGames(result));
  };

  /* const filterByCategory = (value: string) => {
    if (value === "All") {
      dispatch(getFilteredGames(games.filterExs((game) => game.genre)));
    } else if (value === "PC") {
      dispatch(getFilteredGames(games.filterExs((game) => game.genre == "PC")));
    } else if (value === "Xbox") {
      dispatch(getFilteredGames(games.filterExs((game) => game.genre == "Xbox")));
    } else if (value === "Playstation") {
      dispatch(getFilteredGames(games.filterExs((game) => game.genre == "Playstation")));
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
  /*
  const onInputClick = (e: any): void => {
    console.log("on input click", e.target.value);
    let filteredArray = [];
    filteredArray = games.filterExs(game => {
      return game.genre.includes(e.target.value);
    });
    setGames(filteredArray);
  }; */

  return (
    <div className="filter_container">
      <div>
        <p className="products-page__title">{props.title}</p>
        <p className="products-page__title">Sort</p>

        <div className="products-page__container">
          <Dropdown text="Select">
            <Dropdown.Menu className="products-page__select">
              <Dropdown.Item
                text="Rating"
                onClick={() => (type === "ascending" ? sortByRatingAsc() : sortByRatingDesc())}
              />
              <Dropdown.Item
                text="Price"
                onClick={() => (type === "ascending" ? sortByPriceAsc() : sortByPriceDesc())}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="products-page__container">
          <p>Type</p>
          <select className="select" value={type} onChange={changeType}>
            {sortingOptions.map((option) => (
              <option className="select-point" key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Genres</p>
          <ul>
            <li>
              <input name="genreFilter" type="radio" onChange={() => filterByGenre("all")} />
              <span>All</span>
              {/* {games.map((game: Game) => ( */}
              {/*  <GameCards key={game.id} {...game} /> */}
              {/* ))} */}
            </li>

            <li>
              <input name="genreFilter" type="radio" onChange={() => filterByGenre("Racing")} />
              <span>Racing</span>
            </li>

            <li>
              <input name="genreFilter" type="radio" onChange={() => filterByGenre("Strategy")} />
              <span>Strategy</span>
            </li>

            <li>
              <input name="genreFilter" type="radio" onChange={() => filterByGenre("Fighting")} />
              <span>Fighting</span>
            </li>
          </ul>
        </div>

        <div>
          <p>Age</p>
          <ul>
            <li>
              <input name="ageFilter" type="radio" onChange={() => filterByAge("all")} />
              <span>All</span>
            </li>
            <li>
              <input name="ageFilter" type="radio" onChange={() => filterByAge("6+")} />
              <span>6 +</span>
            </li>

            <li>
              <input name="ageFilter" type="radio" onChange={() => filterByAge("12+")} />
              <span>12 +</span>
            </li>
            <li>
              <input name="ageFilter" type="radio" onChange={() => filterByAge("18+")} />
              <span>18 +</span>
            </li>
          </ul>
        </div>
      </div>
      <div>{props.filterByPlatform}</div>
    </div>
  );
};

export default FilterRedux;
