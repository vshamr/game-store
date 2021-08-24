import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setRemoveItemFromCart } from "@/redux/cart-reducer";
import axios from "axios";
import { RootStateType } from "@/components/header";
import "./styles.css";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootStateType) => state.cartPage.cart);

  let itemsPrice = 0;
  const [itemCount, setItemCount] = useState(1);

  let currentDate = new Date();
  const dd = String(currentDate.getDate()).padStart(2, "0");
  const mm = String(currentDate.getMonth() + 1).padStart(2, "0");
  const yyyy = currentDate.getFullYear();

  currentDate = `${mm} / ${dd} / ${yyyy}`;

  if (cart.length === 0) {
    return <h3 className="cart__title">Cart is empty</h3>;
  } else {
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
            itemsPrice += games.price * games.amount;

            return (
              <div className="cart__games-box" key={index}>
                <div>{games.title}</div>
                <div>
                  <select>
                    <option>PC</option>
                    <option>Playstation</option>
                    <option>Xbox</option>
                  </select>
                </div>
                <div> {currentDate}</div>

                <div className="cart_btn-amount">
                  <button
                    onClick={() => {
                      games.amount <= 0 ? (games.amount = 1) : setItemCount(--games.amount);
                    }}
                  >
                    -
                  </button>
                  <p>{games.amount}</p>
                  <button
                    onClick={() => {
                      setItemCount(++games.amount);
                    }}
                  >+
                  </button>
                </div>


                <div>
                  <p>{games.price * games.amount}$</p>
                </div>
                <div onClick={() => dispatch(setRemoveItemFromCart(index))}>
                  <button>x</button>
                </div>
              </div>
            );
          })}
          <div className="cart_btn-order">
            <p className="">Games cost: {itemsPrice}$</p>
            <button onClick={async () => {
                const response = await axios.post("http://localhost:3000/order", { cart });
                alert(response.data);
              }}
            >Buy</button>
          </div>
        </div>
      </div>
    );
  }
};

export default CartPage;
