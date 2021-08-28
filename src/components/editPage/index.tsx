import "./styles.css";
import { deleteGameCard, editGame } from "@/api/editGameCard";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { activeModalEdit } from "@/redux/edit-reducer";

const EditPage = (props) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(props.data.title);
  const [img, setImg] = useState(props.data.img);
  const [price, setPrice] = useState(props.data.price);
  const [descr, setDescr] = useState(props.data.descr);
  const [genre, setGenre] = useState(props.data.genre);
  const [category, setCategory] = useState(props.data.category);
  const [age, setAge] = useState(props.data.age);

  const [confirmPanel, setConfirmPanel] = useState(false);

  const newData = [];

  const addNewData = () => {
    newData.push({ title }, { img }, { price }, { descr }, { genre }, { category }, { age });
    editGame(props.data.key, newData);
  };
  const deleteGame = () => {
    setConfirmPanel(!confirmPanel);
  };
  const confirmDelete = () => {
    deleteGame(props.data.key);
    dispatch(activeModalEdit());
  };

  return (
    <div className="edit">
      <p onClick={() => dispatch(activModalEdit())}>close</p>
      <h2 className="edit__title">Edit Card</h2>
      <div className="edit__container">
        <div className="edit__img">
          <p>Card image</p>
          <img src={img} alt="" />
        </div>
        <div className="edit__info">
          <label htmlFor="name">
            Name
            <input type="text" id="name" onChange={(e) => setTitle(e.target.value)} value={title} />
          </label>
          <label htmlFor="category">
            Category
            <input type="text" id="category" onChange={(e) => setCategory(e.target.value)} value={category} />
          </label>
          <label htmlFor="price">
            Price
            <input type="text" id="price" onChange={(e) => setPrice(e.target.value)} value={price} />
          </label>
          <label htmlFor="image">
            Image
            <input type="text" id="image" onChange={(e) => setImg(e.target.value)} value={img} />
          </label>
          <label htmlFor="genre">
            Genre
            <input type="text" id="genre" onChange={(e) => setGenre(e.target.value)} value={genre} />
          </label>
          <label htmlFor="descr">
            Description
            <textarea id="descr" onChange={(e) => setDescr(e.target.value)} value={descr} />
          </label>
          <label htmlFor="age">
            Age
            <select onChange={(e) => setAge(e.target.value)} value={age}>
              <option>6+</option>
              <option>12+</option>
              <option>16+</option>
              <option>18+</option>
            </select>
          </label>
          <label>Platform</label>
          <label htmlFor="pc">
            PC
            <input type="checkbox" id="pc" onChange={(e) => setAge(e.target.category)} value={category} />
          </label>
          <label htmlFor="playstation">
            PlayStation 5
            <input type="checkbox" id="playstation" onChange={(e) => setAge(e.target.category)} value={category} />
          </label>
          <label htmlFor="xbox">
            Xbox One
            <input type="checkbox" id="xbox" onChange={(e) => setAge(e.target.category)} value={category} />
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
          <p>Delete {title}?</p>
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
