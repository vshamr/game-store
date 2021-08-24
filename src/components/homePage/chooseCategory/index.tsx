import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import GameCards from "@/components/products/gameCards";
import { urlProducts } from "@/api";
import { Game } from "@/constants/interfaces";

function ChosenCategory() {
  const params = useParams();

  const [games, setGames] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetch(`${urlProducts}?category_like=${params.category}`);
      const response = await data.json();

      setGames(response);
    })();
  }, [params]);

  return (
    <div className="container">
      <div className="category">
        <h3 className="category-title">
          <span>{params.category}</span>
        </h3>
        <div className="games-wrapper">
          {games.map((game: Game) => (
            <GameCards key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChosenCategory;
