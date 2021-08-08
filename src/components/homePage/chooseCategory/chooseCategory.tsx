import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GameCards from "@/components/products/gameCards";
import { urlProducts } from "@/api/api";

export interface Game {
  id: string;
  title: string;
  img: string;
  price: string;
  descr: string;
}

function ChosenCategory() {
  const params = useParams();

  const [games, setGames] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      const data = await fetch(`${urlProducts}?category_like=${params.category}`);
      const response = await data.json();

      setGames(response);
    };

    getGames();
  }, [params]);

  return (
    <div className="container">
      <div className="category">
        <h3 className="category-title">
          <span>{params.category}</span> section
        </h3>
        <div className="games-wrapper">
          {games.map((game: Game) => (
            <GameCards key={game.id} {...game} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChosenCategory;
