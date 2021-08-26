import "./styles.css";

const EditPage: React.FC = () => {

  return (
    <div className="edit">
      <h2 className="edit__title">Edit Card</h2>
      <div className="edit__container">
        <div className="edit__img">
          <p>Card image</p>
          <img src="" alt="" />
        </div>
        <div className="edit__info">
          <label htmlFor="name">
            Name
            <input type="text" id="name" />
          </label>
          <label htmlFor="category">
            Category
            <input type="text" id="category" />
          </label>
          <label htmlFor="price">
            Price
            <input type="text" id="price" />
          </label>
          <label htmlFor="image">
            Image
            <input type="text" id="image" />
          </label>
          <label htmlFor="descr">
            Description
            <textarea id="descr" />
          </label>
          <label htmlFor="age">
            Age
            <select>
              <option>6+</option>
              <option>12+</option>
              <option>16+</option>
              <option>18+</option>
            </select>
          </label>
          <label>Platform</label>
          <label htmlFor="pc">
            PC
            <input type="checkbox" id="pc" value="platform" />
          </label>
          <label htmlFor="playstation">
            PlayStation 5
            <input type="checkbox" id="playstation" value="platform" />
          </label>
          <label htmlFor="xbox">
            Xbox One
            <input type="checkbox" id="xbox" value="platform" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
