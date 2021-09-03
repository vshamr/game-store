import { useDispatch } from "react-redux";
import { FiEdit3, GiShoppingCart } from "react-icons/all";

import "./styles.css";
import { setAddItemToCart } from "@/redux/cart-reducer";
import { getCurrentGameCard } from "@/redux/edit-reducer";
import EditPage from "@/components/editPage";
import { useEffect, useState } from "react";

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
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("login") == "\"admin\"");
  }, []);
  console.log(isAdmin);

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
      {isAdmin && modalRenderer()}

      <div className="gameCards">
        <div className="front">
          <img src={img} alt={title} />
          <div className="gameCards__about">
            <h4>{title}</h4>
            <p>${price}</p>
          </div>
        </div>
        <div className="back center">
          <div className="back-content">
            <p className="gameCards-descr">{descr}</p>
            <div className="gameCards-cart">
              {/*{isAdmin &&*/} <FiEdit3 onClick={showModalAndDispatch} />
              <GiShoppingCart onClick={dispatchItem} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCards;
