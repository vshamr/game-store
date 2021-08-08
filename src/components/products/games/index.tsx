import "./styles.css";
import GameCards from "@/components/products/gameCards";
import { Game } from "@/components/homePage/chooseCategory/chooseCategory";

type NewGamesPropsType = {
  newGames: Game[];
};

const NewGames = ({ newGames }: NewGamesPropsType) => (
  <div className="new-games">
    <h3 className="new-games__title">New Games</h3>
    <div className="games-wrapper">
      {newGames.map((game: Game) => (
        <GameCards key={game.id} {...game} />
      ))}
    </div>
  </div>
);

export default NewGames;
