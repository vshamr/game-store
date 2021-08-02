import "../products/gameCards/gameCards.css";
import GameCards from "@/components/products/gameCards/gameCards";
import Categories from "@/components/homePage/categories";
import { GAME_CARDS_DATA } from "@/constants/data";

function HomePage(): JSX.Element {
  return (
    <div>
      <Categories />
      <h2 className="categories-title"><span>Top</span> games</h2>
      <div className="gameCards_inner">
        <div className="gameCards_container">
          {
            GAME_CARDS_DATA.map(({ img, title, price, description }) =>
              <GameCards
                img={img}
                title={title}
                price={price}
                description={description} />
            )
          }
        </div>
      </div>
    </div>
  );
}

export default HomePage;
