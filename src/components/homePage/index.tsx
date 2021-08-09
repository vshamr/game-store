import "../products/gameCards/styles.css";
import GameCards from "@/components/products/gameCards";
import Categories from "@/components/homePage/categories";
import { GAME_CARDS_DATA } from "@/constants/data";

function HomePage(): JSX.Element {
  return (
    <div>
      <Categories />
      <h2 className="gameCards-top-title">
        <span>Top</span> games
      </h2>
      <div className="gameCards_container">
        {GAME_CARDS_DATA.map(({ img, title, price, description }) => (
          <GameCards img={img} title={title} price={price} description={description} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
