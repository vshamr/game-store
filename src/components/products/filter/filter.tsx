import "./styles.css";
import { ParamsAges, ParamsCategory, ParamsGenres } from "@/components/products/filter/filterData";

type FilterPropsType = {
  setAge: (age: ParamsAges) => void;
  setGenre: (genre: ParamsGenres) => void;
  setCategory: (category: ParamsCategory) => void;
};

const Filter = ({ setAge, setCategory, setGenre }: FilterPropsType) => (
  <div className="filter_container">
    <div className="filter_form">
      <div>
        <p className="filter_title">Age</p>
        <div className="filter_box">
          <label htmlFor="ageFilter">
            <input name="ageFilter" type="radio" onChange={() => setAge(ParamsAges.ALL)} />
            <span>All</span>
          </label>
          <label htmlFor="ageFilter">
            <input name="ageFilter" type="radio" onChange={() => setAge(ParamsAges.SIX)} />
            <span>6+</span>
          </label>
          <label htmlFor="ageFilter">
            <input name="ageFilter" type="radio" onChange={() => setAge(ParamsAges.TWELVE)} />
            <span>12+</span>
          </label>
          <label htmlFor="ageFilter">
            <input name="ageFilter" type="radio" onChange={() => setAge(ParamsAges.SIXTEEN)} />
            <span>16+</span>
          </label>
          <label htmlFor="ageFilter">
            <input name="ageFilter" type="radio" onChange={() => setAge(ParamsAges.EIGHTEEN)} />
            <span>18+</span>
          </label>
        </div>
      </div>
      <div>
        <p className="filter_title">Category</p>
        <div className="filter_box">
          <label htmlFor="categoryFilter">
            <input name="categoryFilter" type="radio" onChange={() => setCategory(ParamsCategory.ALL)} />
            <span>All</span>
          </label>
          <label htmlFor="categoryFilter">
            <input name="categoryFilter" type="radio" onChange={() => setCategory(ParamsCategory.PC)} />
            <span>PC</span>
          </label>
          <label htmlFor="categoryFilter">
            <input name="categoryFilter" type="radio" onChange={() => setCategory(ParamsCategory.XBOX)} />
            <span>Xbox</span>
          </label>
          <label htmlFor="categoryFilter">
            <input name="categoryFilter" type="radio" onChange={() => setCategory(ParamsCategory.PLAYSTATION)} />
            <span>Playstation</span>
          </label>
        </div>
      </div>
      <div>
        <p className="filter_title">Genres</p>
        <div className="filter_box">
          <label htmlFor="genreFilter">
            <input name="genreFilter" type="radio" onChange={() => setGenre(ParamsGenres.ALL)} />
            <span>All</span>
          </label>
          <label htmlFor="genreFilter">
            <input name="genreFilter" type="radio" onChange={() => setGenre(ParamsGenres.RACING)} />
            <span>Racing</span>
          </label>
          <label htmlFor="genreFilter">
            <input name="genreFilter" type="radio" onChange={() => setGenre(ParamsGenres.STRATEGY)} />
            <span>Strategy</span>
          </label>
          <label htmlFor="genreFilter">
            <input name="genreFilter" type="radio" onChange={() => setGenre(ParamsGenres.FIGHTING)} />
            <span>Fighting</span>
          </label>
          <label htmlFor="genreFilter">
            <input name="genreFilter" type="radio" onChange={() => setGenre(ParamsGenres.SHOOTER)} />
            <span>Shooter</span>
          </label>
        </div>
      </div>
    </div>
  </div>
);

export default Filter;
