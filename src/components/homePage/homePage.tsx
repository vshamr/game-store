import "../products/gameCards/gameCards.css";
import GameCards from "@/components/products/gameCards/gameCards";
import GAME1_VALHALA from "images/GAME1_VALHALA.jpg";
import GAME3_WATCHDOGS from "images/GAME3_WATCHDOGS.jpg";
import GAME2_SPIDERMAN from "images/GAME2_SPIDERMAN.jpg";
import Categories from "@/components/homePage/categories";

function HomePage(): JSX.Element {
  return (
    <div>
      <Categories />
      <h2 className="categories-title"><span>Top</span> games</h2>
      <div className="gameCards_inner">
        <div className="gameCards_container">
          <GameCards
            img={GAME1_VALHALA}
            title="Assassin's Creed® Valhalla"
            price="60 BYN"
            description="Assassin's Creed Valhalla is a 2020 action role-playing video game developed by Ubisoft Montreal and published by Ubisoft"
          />
          <GameCards
            img={GAME2_SPIDERMAN}
            title="Marvel’s Spider-Man"
            price="70 BYN"
            description="Marvel's Spider-Man: Miles Morales is an action-adventure computer game developed by Insomniac Games "
          />
          <GameCards
            img={GAME3_WATCHDOGS}
            title="Watch Dogs: Legion"
            price="55 BYN"
            description="Watch Dogs: Legion is an Action-adventure computer game developed by Ubisoft Toronto and published by Ubisoft."
          />
          ;
        </div>
      </div>
    </div>
  );
}

export default HomePage;
