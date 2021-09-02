import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CgCloseR } from "react-icons/all";
import axios from "axios";

import "./styles.css";
import { addGameAC, getProductsArray } from "@/redux/edit-reducer";
import { productAPI } from "@/api";

const EditPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentGameCard = useSelector((state) => state.editPage.currentGameCard);

  const [showModal, setShowModal] = useState(true);

  const [gameId, setGameId] = useState("");
  const [gameTitle, setGameTitle] = useState("");
  const [gameImg, setGameImg] = useState("");
  const [gamePrice, setGamePrice] = useState("");
  const [gameDescr, setGameDescr] = useState("");
  const [gameGenre, setGameGenre] = useState("");
  const [gameCategory, setGameCategory] = useState("");
  const [gameAge, setGameAge] = useState("");

  useEffect(() => {
    if (currentGameCard === null) {
      setGameTitle("");
      setGameGenre("");
      setGamePrice("");
      setGameImg("");
      setGameDescr("");
      setGameCategory("");
      setGameAge("");
    } else {
      setGameId(currentGameCard.id);
      setGameTitle(currentGameCard.title);
      setGameGenre(currentGameCard.genre);
      setGamePrice(currentGameCard.price);
      setGameImg(currentGameCard.img);
      setGameDescr(currentGameCard.descr);
      setGameCategory(currentGameCard.category);
      setGameAge(currentGameCard.age);
    }
  }, [currentGameCard]);

  const displayImage = () => {
    if (!gameImg) {
      return <div>No picture</div>;
    }
    return <img src={gameImg} alt="Game card image" />;
  };

  const addGame = async () => {
    const response = await axios.post(productAPI, {
      gameTitle,
      gameGenre,
      gamePrice,
      gameImg,
      gameDescr,
      gameAge,
      gameCategory,
    });
    dispatch(addGameAC(response.data));
    alert("Game card has been created");
  };

  const editGame = async () => {
    const response = await axios.put(productAPI, {
      gameId,
      gameTitle,
      gameGenre,
      gamePrice,
      gameImg,
      gameDescr,
      gameAge,
      gameCategory,
    });
    dispatch(getProductsArray(response.data));
    alert("Game has been edited");
  };

  const deleteGame = async () => {
    confirm(`Are you sure  you want to delete the product ${gameTitle}?`).then(async (result) => {
      if (result === true) {
        await axios.delete(`http://localhost:3001/product/${currentGameCard.id}`).then((response) => {
          alert("Deleted!");
          dispatch(getProductsArray(response.data));
        });
      }
    });
  };

  return (
    <div className="edit">
      <CgCloseR onClick={() => setShowModal(!showModal)} />
      <h2 className="edit__title">Edit Card</h2>
      <div className="edit__container">
        <div className="edit__img">
          <p>Card image</p>
          {displayImage()}
        </div>
        <div className="edit__info">
          <label htmlFor="name">
            Name
            <input type="text" id="name" onChange={(e) => setGameTitle(e.target.value)} value={gameTitle} />
          </label>
          <label htmlFor="price">
            Price
            <input type="text" id="price" onChange={(e) => setGamePrice(e.target.value)} value={gamePrice} />
          </label>
          <label htmlFor="category">
            Category
            <input type="text" id="category" onChange={(e) => setGameCategory(e.target.value)} value={gameCategory} />
          </label>
          <label htmlFor="genre">
            Genre
            <input type="text" id="genre" onChange={(e) => setGameGenre(e.target.value)} value={gameGenre} />
          </label>
          <label htmlFor="image">
            Image
            <input type="text" id="image" onChange={(e) => setGameImg(e.target.value)} value={gameImg} />
          </label>
          <label htmlFor="age">
            Age
            <input type="text" id="age" onChange={(e) => setGameAge(e.target.value)} value={gameAge} />
          </label>
          <label htmlFor="descr">
            Description
            <textarea id="descr" onChange={(e) => setGameDescr(e.target.value)} value={gameDescr} />
          </label>
        </div>

        <div>
          <button
            type="submit"
            onClick={() => {
              currentGameCard === null ? addGame() : editGame();
              setShowModal(!showModal);
            }}
          >
            Submit
          </button>
          <button
            onClick={() => {
              setShowModal(!showModal);
              deleteGame();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
