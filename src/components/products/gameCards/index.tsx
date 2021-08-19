import "./styles.css";

type GameCardsType = {
  img: any;
  title: string;
  price: string;
  descr: string;
};

function GameCards({ img, title, price, descr }: GameCardsType) {
  return (
    <div className="gameCards">
      <div className="gameCards_content">
        <img src={img} alt={title} />
        <div className="gameCards-about">{descr}</div>
      </div>
      <div className="gameCards-title">
        <h4>{title}</h4>
        <p>{price}</p>
      </div>
    </div>
  );
}

export default GameCards;
