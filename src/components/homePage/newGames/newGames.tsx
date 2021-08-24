import { Game } from "@/components/homePage/chooseCategory";
import GameCards from "@/components/products/gameCards";

type Props = {
  newGames: Game[];
};

const NewGames = ({ newGames }: Props) => (
  <div className="new-games">
    <div className="games-wrapper">
      {newGames.map((game: Game) => (
        <GameCards key={game.id} game={game} />
      ))}
    </div>
  </div>
);

export default NewGames;
