import "./styles.css";
import { deleteGameCard, editGame } from "@/api/editGameCard";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { activeModalEdit } from "@/redux/edit-reducer";
import { CgCloseR } from "react-icons/all";

type GameCardsType = {
  id: string;
  img: string;
  title: string;
  price: string;
  descr: string;
  genre: string;
  category: string;
  age: string;
};

const EditPage = (game: GameCardsType): JSX.Element => {
  const dispatch = useDispatch();

  const { img, title, price, descr, genre, category, age, id } = game;

  const [gameTitle, setGameTitle] = useState(game.title);
  const [gameImg, setGameImg] = useState(game.img);
  const [gamePrice, setGamePrice] = useState(game.price);
  const [gameDescr, setGameDescr] = useState(game.descr);
  const [gameGenre, setGameGenre] = useState(game.genre);
  const [gameCategory, setGameCategory] = useState(game.category);
  const [gameAge, setGameAge] = useState(game.age);

  const [confirmPanel, setConfirmPanel] = useState(false);

  const newData = [];

  const addNewData = () => {
    newData.push(
      { title: gameTitle },
      { img: gameImg },
      { price: gamePrice },
      { descr: gameDescr },
      { genre: gameGenre },
      { category: gameCategory },
      { age: gameAge }
    );
    editGame(game.id, newData);
  };
  const deleteGame = () => {
    setConfirmPanel(!confirmPanel);
  };
  const confirmDelete = () => {
    deleteGameCard(game.id);
    dispatch(activeModalEdit(game));
  };

  return (
    <div className="edit">
      <p onClick={() => dispatch(activeModalEdit(game))}>
        <CgCloseR />
      </p>
      <h2 className="edit__title">Edit Card</h2>
      <div className="edit__container">
        <div className="edit__img">
          <p>Card image</p>
          <img src={gameImg} alt="" />
        </div>
        <div className="edit__info">
          <label htmlFor="name">
            Name
            <input type="text" id="name" onChange={(e) => setGameTitle(e.target.value)} value={gameTitle} />
          </label>
          <label htmlFor="category">
            Category
            <input type="text" id="category" onChange={(e) => setGameCategory(e.target.value)} value={gameCategory} />
          </label>
          <label htmlFor="price">
            Price
            <input type="text" id="price" onChange={(e) => setGamePrice(e.target.value)} value={gamePrice} />
          </label>
          <label htmlFor="image">
            Image
            <input type="text" id="image" onChange={(e) => setGameImg(e.target.value)} value={gameImg} />
          </label>
          <label htmlFor="genre">
            Genre
            <input type="text" id="genre" onChange={(e) => setGameGenre(e.target.value)} value={gameGenre} />
          </label>
          <label htmlFor="descr">
            Description
            <textarea id="descr" onChange={(e) => setGameDescr(e.target.value)} value={gameDescr} />
          </label>
          <label htmlFor="age">
            Age
            <select onChange={(e) => setGameAge(e.target.value)} value={gameAge}>
              <option>6+</option>
              <option>12+</option>
              <option>16+</option>
              <option>18+</option>
            </select>
          </label>
          <label>Platform</label>
          <label htmlFor="pc">
            PC
            <input type="checkbox" id="pc" onChange={(e) => setGameAge(e.target.category)} value={gameCategory} />
          </label>
          <label htmlFor="playstation">
            PlayStation 5
            <input
              type="checkbox"
              id="playstation"
              onChange={(e) => setGameAge(e.target.category)}
              value={gameCategory}
            />
          </label>
          <label htmlFor="xbox">
            Xbox One
            <input type="checkbox" id="xbox" onChange={(e) => setGameAge(e.target.category)} value={gameCategory} />
          </label>
        </div>
        <div className={confirmPanel ? "row edit-footer disactive" : "row edit-footer active"}>
          <button onClick={addNewData} className="modal-button">
            <p>Submit</p>
          </button>
          <button onClick={deleteGame}>
            <p>Delete card</p>
          </button>
        </div>
        <div className={confirmPanel ? "footer-confirm active" : "footer-confirm disactive"}>
          <p>Delete {gameTitle}?</p>
          <div className="row edit-footer">
            <button onClick={confirmDelete}>
              <p>Yes</p>
            </button>
            <button onClick={deleteGame}>
              <p>No</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
