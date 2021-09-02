import { useDispatch } from "react-redux";
import { GiShoppingCart, GrEdit } from "react-icons/all";

import "./styles.css";
import { setAddItemToCart } from "@/redux/cart-reducer";
import { getCurrentGameCard } from "@/redux/edit-reducer";
import EditPage from "@/components/editPage";
import { useState } from "react";

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
  const [showModal, setShowModal] = useState(false);

  const login = localStorage.getItem("login");
  const isAdmin = login === "admin";

  function dispatchItem() {
    dispatch(setAddItemToCart(game));
  }

  function showModalAndDispatch() {
    dispatch(getCurrentGameCard(game));
    setShowModal(!showModal);
  }

  function modalRenderer() {
    return showModal ? <EditPage /> : null;
  }

  return (
    <div>
      {/* {isAdmin && */}
      <div>{modalRenderer()}</div>

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
          {/* {isAdmin && */}
          <GrEdit onClick={showModalAndDispatch} />
        </div>
      </div>
    </div>
  );
}

export default GameCards;
