import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CgCloseO, TiMinus, TiPlus } from "react-icons/all";
import axios from "axios";

import "./styles.css";
import { setRemoveItemFromCart } from "@/redux/cart-reducer";
import { ReducersType } from "@/redux/redux-store";
import { Game } from "@/constants/interfaces";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: ReducersType) => state.cartPage.carts);

  let itemsPrice = 0;
  const [itemCount, setItemCount] = useState(1);

  const date = new Date();
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();

  const currentDate = `${mm} / ${dd} / ${yyyy}`;

  if (cart.length === 0) {
    return <h3 className="cart__title">Cart is empty</h3>;
  }

  const decrement = useMemo(
    () => () => {
      if (itemCount >= 1) setItemCount(itemCount - 1);
      else setItemCount(itemCount);
    },
    [itemCount]
  );

  return (
    <div className="cart__box">
      <div className="cart__container">
        <p>Game</p>
        <p>Platform</p>
        <p>Order date</p>
        <p>Amount</p>
        <p>Price ($)</p>
      </div>
      <div className="cart__inner">
        {cart.map((games: Game, index: number) => {
          itemsPrice += games.price * itemCount;

          return (
            <div className="cart__games-box" key={index}>
              <div className="cart__games-container">
                <div className="cart__games-category">
                  <img className="cart__games-img" src={games.img} alt={games.title} />
                  <div className="cart__games-title"> {games.title}</div>
                </div>
                <div>
                  <select>
                    <option>PC</option>
                    <option>Playstation</option>
                    <option>Xbox</option>
                  </select>
                </div>
                <div> {currentDate}</div>

                <div className="cart__btn-amount">
                  <p>
                    <TiPlus
                      onClick={() => {
                        setItemCount(itemCount + 1);
                      }}
                    />
                  </p>
                  <p>{itemCount}</p>
                  <p>
                    <TiMinus onClick={decrement} />
                  </p>
                </div>
                <div>
                  <p>{games.price * itemCount}$</p>
                </div>
              </div>
              <div className="cart__btn-close" onClick={() => dispatch(setRemoveItemFromCart(index))}>
                <CgCloseO />
              </div>
            </div>
          );
        })}
        <div className="cart__btn-order">
          <p className="cart__btn-order-title">Total: {itemsPrice}$</p>
          <button
            onClick={async () => {
              const response = await axios.post(`http://localhost:3000/order`, { carts: cart });
              alert(response.data);
            }}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
