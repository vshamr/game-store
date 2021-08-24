import "./styles.css";
import { setAddItemToCart } from "@/redux/cart-reducer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type GameCardsType = {
  img: any;
  title: string;
  price: string;
  descr: string;
};

function GameCards({ img, title, price, descr }: GameCardsType): JSX.Element {
  const dispatch = useDispatch();

  const [productsArray, setProductsArray] = useState([]);

  function dispatchItem() {
    for (let i = 0; i < productsArray.length; i++) {
      if (productsArray[i].descr === descr) {
        dispatch(setAddItemToCart(productsArray[i]));
      }
    }
  }

  return (
    <div className="gameCards">
      <div className="gameCards_content">
        <img src={img} alt={title} />
        <div className="gameCards-about">{descr}</div>
      </div>
      <div className="gameCards-title">
        <h4>{title}</h4>
        <p>${price}</p>
        <button className="game-card_btn" onClick={() => dispatchItem()}>
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default GameCards;
