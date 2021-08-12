import { useEffect, useState } from "react";

import "./styles.css";
import { Game } from "@/components/homePage/chooseCategory";
import GameCards from "@/components/products/gameCards";

function Filter() {
  const [filter, setFilter] = useState(" ");
  const [filterGameByCategory, setFilterGameByCategory] = useState([]);
  const [filterGameByAge, setFilterGameByAge] = useState([]);
  const [sortRating, setSortRating] = useState([]);
  const [sortPrice, setSortPrice] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    setGames(games);
  }, []);

  useEffect(() => {
    setGames([]);
    const filteredByGenre = games.map((game: Game) => ({ ...game, filteredGenre: game.genre.includes(filter) }));
    setGames(filteredByGenre);
  }, [filter]);

  useEffect(() => {
    const filteredByAge = games.map((game: Game) => ({ ...game, filteredAge: game.age.includes(filter) }));
    setFilterGameByAge(filteredByAge);
  }, [filter]);

  useEffect(() => {
    setFilterGameByCategory([]);
    const filteredByCategory = games.map((game: Game) => ({ ...game, filteredCategory: game.category.includes(filter) }));
    setFilterGameByCategory(filteredByCategory);
  }, [filter]);

  useEffect(() => {
    const sortedByRating = games.sort((a, b) => (a.rating > b.rating ? -1 : 1));
    setSortRating(sortedByRating);
  });

  useEffect(() => {
    const sortedByPrice = games.sort((a, b) => (a.price > b.price ? -1 : 1));
    setSortPrice(sortedByPrice);
  });

  return (
    <div className="filter_container">
      <form className="filter_form">
        <div className="filter_inner">
          <div>
            <p className="filter_title">Genres:</p>
            <div className="filter_bar">
              <input
                type="radio"
                id="shooter"
                name="filter"
                value="shooter"
                active={filter === "Shooter"}
                onClick={() => setFilter("Shooter")}
              />
              <label htmlFor="shooter">Shooter</label>
            </div>
            <div className="filter_bar">
              <input
                type="radio"
                id="racing"
                name="filter"
                value="racing"
                active={filter === "Racing"}
                onClick={() => setFilter("Racing")}
              />
              <label htmlFor="racing">Racing</label>
            </div>
            <div className="filter_bar">
              <input
                type="radio"
                id="strategy"
                name="filter"
                value="strategy"
                active={filter === "Strategy"}
                onClick={() => setFilter("Strategy")}
              />
              <label htmlFor="strategy">Strategy</label>
            </div>
            <div className="filter_bar">
              <input
                type="radio"
                id="fighting"
                name="filter"
                value="fighting"
                active={filter === "Fighting"}
                onClick={() => setFilter("Fighting")}
              />
              <label htmlFor="fighting">Fighting</label>
            </div>
          </div>
          <div className="filter_game-container">
            {games.map((game: Game) => (game.filteredGenre ? <GameCards key={game.id} {...game} /> : ""))}
          </div>
        </div>

        <div className="filter_inner">
          <div>
            <p className="filter_title">Category:</p>
            <div className="filter_bar">
              <input
                type="radio"
                id="playstation"
                name="filter"
                value="playstation"
                active={filter === "playstation"}
                onClick={() => setFilter("playstation")}
              />
              <label htmlFor="playstation">Playstation</label>
            </div>
            <div className="filter_bar">
              <input
                type="radio"
                id="xbox"
                name="filter"
                value="xbox"
                active={filter === "xbox"}
                onClick={() => setFilter("xbox")}
              />
              <label htmlFor="xbox">Xbox</label>
            </div>
            <div className="filter_bar">
              <input
                type="radio"
                id="pc"
                name="filter"
                value="pc"
                active={filter === "pc"}
                onClick={() => setFilter("pc")}
              />
              <label htmlFor="pc">PC</label>
            </div>
          </div>
          <div className="filter_game-container">
            {filterGameByCategory.map((game: Game) =>
              game.filteredCategory ? <GameCards key={game.id} {...game} /> : ""
            )}
          </div>
        </div>

        <div className="filter_inner">
          <div>
            <p className="filter_title">Age:</p>
            <div className="filter_bar">
              <input
                type="radio"
                id="all"
                name="filter"
                value="all"
                active={filter === "all"}
                onClick={() => setFilter("all")}
              />
              <label htmlFor="all">All</label>
            </div>
            <div className="filter_bar">
              <input
                type="radio"
                id="6+"
                name="filter"
                value="6+"
                active={filter === "6+"}
                onClick={() => setFilter("6+")}
              />
              <label htmlFor="6+">6+</label>
            </div>
            <div className="filter_bar">
              <input
                type="radio"
                id="12+"
                name="filter"
                value="12+"
                active={filter === "12+"}
                onClick={() => setFilter("12+")}
              />
              <label htmlFor="12+">12+</label>
            </div>
            <div className="filter_bar">
              <input
                type="radio"
                id="18+"
                name="filter"
                value="12+"
                active={filter === "18+"}
                onClick={() => setFilter("18+")}
              />
              <label htmlFor="18+">18+</label>
            </div>
          </div>
          <div className="filter_game-container">
            {filterGameByAge.map((game: Game) => (game.filteredAge ? <GameCards key={game.id} {...game} /> : ""))}
          </div>
        </div>

        <div>
          <p className="filter_title">Sort by:</p>
          <div className="filter_bar">
            <input
              type="radio"
              id="rating"
              name="sorting"
              value="rating"
            />
            <label htmlFor="rating">Rating</label>
          </div>
          <div>{sortRating.map((g: Game) => <GameCards key={g.id} {...g} /> && "")}</div>

          <div className="filter_bar">
            <input type="radio" id="price" name="sorting" value="price" />
            <label htmlFor="price">Price</label>
          </div>
          <div>{sortPrice.map((g: Game) => <GameCards key={g.id} {...g} /> && "")}</div>
        </div>
      </form>
    </div>
  );
}

export default Filter;
