import "./styles.css";

type GameCardsType = {
  img: any;
  title: string;
  price: string;
  descr: string;
  onAdd: any;
};

function GameCards({ img, title, price, descr, onAdd }: GameCardsType) {
  return (
    <div className="gameCards">
      <div className="gameCards_content">
        <img src={img} alt={title} />
        <div className="gameCards-about">{descr}</div>
      </div>
      <div className="gameCards-title">
        <h4>{title}</h4>
        <p>${price}</p>
        <button className="game-card_btn" onClick={() => onAdd() }>
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default GameCards;
