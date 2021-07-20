import "./gameCards.css";

type GameCardsType = {
  img: string;
  title: string;
  price: string;
  description: string;
};

function GameCards({ img, title, price, description }: GameCardsType) {
  const showModal = () => alert("got product");

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

    </div>
  );
}

export default GameCards;
