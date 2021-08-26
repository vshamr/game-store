import { useDispatch } from "react-redux";
import { GiShoppingCart } from "react-icons/all";

import "./styles.css";
import { setAddItemToCart } from "@/redux/cart-reducer";

type GameCardsType = {
  game: {
    img: string;
    title: string;
    price: string;
    descr: string;
  };
};

function GameCards({ game }: GameCardsType): JSX.Element {
  const dispatch = useDispatch();
  const { img, title, price, descr } = game;

  function dispatchItem() {
    dispatch(setAddItemToCart(game));
  }

  return (
    <div className="gameCards">
      <div className="gameCards_content">
        <img src={img} alt={title} />
        <div className="gameCards-about">{descr}</div>
      </div>
      <div className="gameCards-title">
        <h4>{title}</h4>
        <p>
          ${price} <GiShoppingCart onClick={dispatchItem} />
        </p>
        <button onClick={() => alert('edit')}>Edit</button>
      </div>
    </div>
  );
}

export default GameCards;
