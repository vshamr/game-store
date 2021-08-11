import { useEffect, useState } from "react";

import "./styles.css";
import { GAME_CARDS_DATA } from "@/constants/data";
import { Game } from "@/components/homePage/chooseCategory";
import GameCards from "@/components/products/gameCards";

function Filter() {
  const [filter, setFilter] = useState(" ");
  const [filterGameByCategory, setFilterGameByCategory] = useState([]);
  const [filterGameByAge, setFilterGameByAge] = useState([]);
  const [sortRating, setSortRating] = useState([]);
  const [sortPrice, setSortPrice] = useState([]);
  const [game, setGame] = useState([]);

  useEffect(() => {
    setGame(game);
  }, []);

  useEffect(() => {
    setGame([]);
    const filteredByGenre = GAME_CARDS_DATA.map((g) => ({ ...g, filteredGenre: g.genre.includes(filter) }));
    setGame(filteredByGenre);
  }, [filter]);

  useEffect(() => {
    const filteredByAge = GAME_CARDS_DATA.map((g) => ({ ...g, filteredAge: g.age.includes(filter) }));
    setFilterGameByAge(filteredByAge);
  }, [filter]);

  useEffect(() => {
    setFilterGameByCategory([]);
    const filteredByCategory = GAME_CARDS_DATA.map((g) => ({ ...g, filteredCategory: g.category.includes(filter) }));
    setFilterGameByCategory(filteredByCategory);
  }, [filter]);

  useEffect(() => {
    const sortedByRating = GAME_CARDS_DATA.sort((a, b) => (a.rating > b.rating ? -1 : 1));
    setSortRating(sortedByRating);
  });

  useEffect(() => {
    const sortedByPrice = GAME_CARDS_DATA.sort((a, b) => (a.price > b.price ? -1 : 1));
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
            {game.map((g: Game) => (g.filteredGenre ? <GameCards key={g.id} {...g} /> : ""))}
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
            {filterGameByCategory.map((g: Game) => (g.filteredCategory ? <GameCards key={g.id} {...g} /> : ""))}
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
            {filterGameByAge.map((g: Game) => (g.filteredAge ? <GameCards key={g.id} {...g} /> : ""))}
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
