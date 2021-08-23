import "./styles.css";
const db = require("../../../../db.json");

function CartPage(props) {
  const { title, cartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);

  let currentDate = new Date();
  const dd = String(currentDate.getDate()).padStart(2, "0");
  const mm = String(currentDate.getMonth() + 1).padStart(2, "0");
  const yyyy = currentDate.getFullYear();

  currentDate = `${mm} / ${dd} / ${yyyy}`;

  return (
    <div>
      <h2>Cart Page</h2>
      <div>{cartItems.length === 0 && <div>Cart is empty</div>}</div>

      {cartItems.map((game) => (
        <div key={game.id}>
          <div>{title}</div>
          <div>
            <button onClick={() => onAdd(db.games)} className="add">
              +
            </button>
            <button onClick={() => onRemove(db.games)} className="remove">
              -
            </button>
          </div>
          <div>
            {game.qty} x ${game.price.toFixed(2)}
          </div>
        </div>
      ))}
      {cartItems.length !== 0 && (
        <>
          <div>
            <div>Items Price</div>
            <div>${itemsPrice.toFixed(2)}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
