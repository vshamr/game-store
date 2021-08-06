import { Link } from "react-router-dom";

import "./styles.css";
import { CATEGORIES_DATA } from "@/constants/data";
import { Routes } from "@/constants/Routes";

type Props = {
  isDropDownOpen: boolean;
};

const ProductsDropDown = ({ isDropDownOpen }: Props) => (
  <ul className={isDropDownOpen ? "drop-down-visible" : "drop-down"}>
    {CATEGORIES_DATA.map(({ id, title, category }) => (
      <li key={id}>
        <Link to={`${Routes.PRODUCTS}/${category}`}>{title}</Link>
      </li>
    ))}
  </ul>
);

export default ProductsDropDown;
