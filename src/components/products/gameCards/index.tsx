import "./styles.css";
import { setAddItemToCart } from "@/redux/cart-reducer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type GameCardsType = {
  game: {
    img: any;
    title: string;
    price: string;
    descr: string;
  },
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
        <p>${price}</p>
        <button className="game-card_btn" onClick={dispatchItem}>
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default GameCards;
