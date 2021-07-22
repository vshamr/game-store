import "./gameCards.css";


type GameCardsType = {
  img: string;
  title: string;
  price: string;
  description: string;
  date: string;
};

function GameCards({ img, title, price, description, date }: GameCardsType) {
  const sortedGameCards = date.split("-").sort((a, b) => b.date - a.date);

  return (
    <div className="gameCards">
      <div className="gameCards_content">
        <div className="gameCards-img">
          <img src={img} alt={title} />
        </div>
        <div className="gameCards-about">{description}</div>
      </div>

      <div className="gameCards-title">
        <h4>{title}</h4>
        <p>{price}</p>
      </div>
      <div>{sortedGameCards}</div>
    </div>
  );
}

export default GameCards;
