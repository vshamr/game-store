import { Link } from "react-router-dom";
import "./categories.css";
import { CATEGORIES_DATA } from "@/constants/data";
import { Routes } from "@/constants/Routes";

const Categories = (): JSX.Element => (
  <div className="categories">
    <h2 className="categories-title">Categories</h2>
    <div className="categories-content">
      {CATEGORIES_DATA.map(({ id, category, title, icon }) => (
        <Link to={`${Routes.PRODUCTS}/${category}`} key={id}>
          <div className="categories-item">
            <div>{icon}</div>
            <h4>{title}</h4>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default Categories;
