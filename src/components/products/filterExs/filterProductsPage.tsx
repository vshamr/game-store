import "../Filter/styles.css";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Game } from "@/constants/interfaces";
import GameCards from "@/components/products/gameCards";
import FilterRedux from "@/components/products/filterExs/filterRedux";

const FilterProductsPage: React.FC = () => {
  /* const params = useParams();

  const [games, setGames] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      const data = await fetch(`${urlProducts}?genre_like=${params.genre}`);
      const response = await data.json();

      setGames(response);
    };
    getGames();
  }, [params]); */
  /* const onInputClick = (e: any): void => {
    console.log("on input click", e.target.value);
    let filteredArray = [];
    filteredArray = games.filterExs(game => {
      return game.genre.includes(e.target.value);
    });
    setGames(filteredArray); */
  const filteredGames = useSelector((state) => state.filteredGames);

  const [games, setGames] = useState([]);
  const [pcProducts, setPcProducts] = useState([]);

  async function getProducts() {
    try {
      await URL.getGames().then((response) => {
        setGames(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const filterPcGames = () => {
    const newArr = games.filter((game: Game) => game.category === "pc");
    setPcProducts(newArr);
  };

  useEffect(() => {
    filterPcGames();
  }, [games]);

  function displayGames() {
    if (filteredGames.length === 0) {
      return pcProducts.map((game: Game) => <GameCards key={game.id} {...game} />);
    }
    if (filteredGames.length !== 0) {
      return filteredGames.map((game: Game) => (
        <div>{game.category === "pc" ? <GameCards key={game.id} {...game} /> : null}</div>
      ));
    }
  }

  return (
    <div>
      <FilterRedux title="PC" filterByPlatform={displayGames()} />
    </div>
  );
};

export default FilterProductsPage;
