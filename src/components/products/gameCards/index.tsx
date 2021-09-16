import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit3, GiShoppingCart } from "react-icons/all";

import "./styles.css";
import { setAddItemToCart } from "@/redux/cart-reducer";
import { getCurrentGameCard } from "@/redux/edit-reducer";
import EditPage from "@/components/editPage";
import Star from "@/components/products/gameCards/star";

type GameCardsType = {
  game: {
    img: string;
    title: string;
    price: string;
    descr: string;
    rating?: any;
  };
};

function GameCards({ game }: GameCardsType): JSX.Element {
  const dispatch = useDispatch();
  const { isAdmin, isLoggedIn } = useSelector(({ userPage: { isLoggedIn, isAdmin } }) => ({ isLoggedIn, isAdmin }));

  const { img, title, price, descr } = game;
  const [showModal, setShowModal] = useState(false);

  const ratingCounter = game.rating;
  const stars = [...Array(parseInt(ratingCounter))].map((i) => <Star key={i} />);

  function dispatchItem() {
    dispatch(setAddItemToCart(game));
  }

  function showModalAndDispatch() {
    dispatch(getCurrentGameCard(game));
    setShowModal(!showModal);
  }

  function modalRender() {
    return showModal && <EditPage setShowModal={setShowModal} />;
  }

  return (
    <div>
      {!isAdmin && isLoggedIn && modalRender()}
      <div className="gameCards">
        <div className="front">
          <img className="gameCards__img" src={img} alt={title} />
          <div className="gameCards__about">
            <h4>{title}</h4>
            <div className="gameCards__about-inner">
              <p>{stars}</p>
              <p>${price}</p>
            </div>
          </div>
        </div>
        <div className="back center">
          <div className="back__content">
            <p className="gameCards-descr">{descr}</p>
            <div className="gameCards__btn">
              {!isAdmin && isLoggedIn && <FiEdit3 onClick={showModalAndDispatch} />}
              <GiShoppingCart onClick={dispatchItem} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(GameCards);
