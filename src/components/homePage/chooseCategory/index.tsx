import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./styles.css";
import GameCards from "@/components/products/gameCards";
import { urlProducts } from "@/api";
import { Game } from "@/constants/interfaces";

function ChosenCategory(): JSX.Element {
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
    <>
      <h2 className="chosenCategory__title">{params.category}</h2>
      <div className="games-wrapper">
        {games.map((game: Game) => (
          <GameCards key={game.id} game={game} />
        ))}
      </div>
    </>
  );
}

export default ChosenCategory;
