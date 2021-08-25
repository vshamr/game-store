import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRemoveItemFromCart } from "@/redux/cart-reducer";
import { CgCloseO, TiMinus, TiPlus } from "react-icons/all";
import axios from "axios";

import "./styles.css";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartPage.cart);

  let itemsPrice = 0;
  const [itemCount, setItemCount] = useState(1);

  let currentDate = new Date();
  const dd = String(currentDate.getDate()).padStart(2, "0");
  const mm = String(currentDate.getMonth() + 1).padStart(2, "0");
  const yyyy = currentDate.getFullYear();

  currentDate = `${mm} / ${dd} / ${yyyy}`;

  if (cart.length === 0) {
    return <h3 className="cart__title">Cart is empty</h3>;
  }
  return (
    <div className="cart__box">
      <div className="cart__container">
        <p>Name</p>
        <p>Platform</p>
        <p>Order date</p>
        <p>Amount</p>
        <p>Price ($)</p>
      </div>
      <div className="cart__inner">
        {cart.map((games, index) => {
          itemsPrice += games.price * itemCount;

          return (
            <div className="cart__games-box" key={index}>
              <div className="cart__games-container">
                <div className="cart__games-title">{games.title}</div>
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
                    <TiMinus onClick={() => setItemCount(itemCount > 0 && itemCount - 1)} />
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
              const response = await axios.post(`http://localhost:3000/order`, { cart });
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
