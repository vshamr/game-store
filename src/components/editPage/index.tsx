import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CgCloseR } from "react-icons/all";

import "./styles.css";
import { addGameAC, getProductsArray } from "@/redux/edit-reducer";
import { editPageAPI } from "@/api";
import { Game } from "@/constants/interfaces";
import { ReducersType } from "@/redux/redux-store";

type PropsType = {
  setShowModal: Function;
};

const EditPage = ({ setShowModal }: PropsType) => {
  const dispatch = useDispatch();
  const currentGameCard = useSelector((state: ReducersType) => state.editPage.currentGameCard);

  const [game, setGame] = useState<Game>({
    title: "",
    category: "",
    genre: "",
    age: "",
    price: "",
    img: "",
    descr: "",
  });

  useEffect(() => {
    if (currentGameCard) {
      setGame(currentGameCard);
    }
  }, [currentGameCard]);

  const displayImage = () => {
    if (!game.img) {
      return <div>No picture</div>;
    }

    return <img src={game.img} alt="Game card" />;
  };

  const addGame = async (): Promise<void> => {
    const response = await editPageAPI.addGame({ game });
    dispatch(addGameAC(response.data));
    alert("Game card has been created");
  };

  const editGame = async (): Promise<void> => {
    const isChanged = confirm(`Are you sure you want to change this game`);
    if (isChanged) {
      await editPageAPI.editGame(game).then((response) => {
        dispatch(getProductsArray(response.data));
        alert("Game has been edited");
      });
    }
  };

  const deleteGame = async (): Promise<void> => {
    const isDelete = confirm(`Are you sure  you want to delete the product ${game.title}?`);
    if (isDelete) {
      await editPageAPI.deleteGame(currentGameCard).then((response) => {
        alert("Deleted!");
        dispatch(getProductsArray(response.data));
      });
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="edit__wrapper">
      <CgCloseR onClick={closeModal} type="button" className="modal__close-btn" />
      <h2 className="edit__title">Edit Card</h2>
      <div className="edit__container">
        <div className="edit__img">{displayImage()}</div>
        <div className="edit__info">
          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              onChange={(e): void => setGame({ ...game, title: e.target.value })}
              value={game?.title || ""}
            />
          </label>
          <label htmlFor="price">
            Price
            <input
              type="number"
              id="price"
              onChange={(e): void => setGame({ ...game, price: e.target.value })}
              value={game?.price || ""}
            />
          </label>
          <label htmlFor="image">
            Image
            <input
              type="url"
              id="image"
              onChange={(e): void => setGame({ ...game, img: e.target.value })}
              value={game?.img || ""}
            />
          </label>
          <label htmlFor="age">
            Age
            <input
              type="text"
              id="age"
              onChange={(e): void => setGame({ ...game, age: e.target.value })}
              value={game?.age || ""}
            />
          </label>
          <label htmlFor="descr">
            Description
            <textarea
              id="descr"
              onChange={(e): void => setGame({ ...game, descr: e.target.value })}
              value={game?.descr || ""}
            />
          </label>
          <label htmlFor="genre">
            Genre
            <input
              type="text"
              id="genre"
              onChange={(e): void => setGame({ ...game, genre: e.target.value })}
              value={game?.genre || ""}
            />
          </label>
          <label htmlFor="">
            Category
            <select onChange={(e): void => setGame({ ...game, category: e.target.value })} value={game?.category || ""}>
              <option>XboxOne</option>
              <option>Playstation</option>
              <option>PC</option>
            </select>
          </label>
        </div>
      </div>
      <div className="edit__btn-container">
        <button
          className="submit-btn"
          type="submit"
          onClick={(): void => {
            currentGameCard === null ? addGame() : editGame();
          }}
        >
          Submit
        </button>
        <button
          className="delete-btn"
          onClick={(): void => {
            deleteGame();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default EditPage;
