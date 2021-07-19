import { Link } from "react-router-dom";
import { useState } from "react";
import ProductsData from "./productsData";

function ProductsDropDown(): JSX.Element {
  const [click, setClick] = useState(false);

  return (
    <>
      <ul className={click ? "dropdown-menu clicked" : "dropdown-menu"}>
        {ProductsData.map((item, index) => (
          <li key={index.toString()}>
            <Link to={item.path} onClick={() => setClick(false)}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

/* type DropDownProps = {
  isDropDownOpen: boolean;
};

const ProductsDropDown = ({ isDropDownOpen }: DropDownProps) => (
  <ul className={isDropDownOpen ? "drop-down visible" : "drop-down"}>
    {productsData.map(({ id, category, title }) => (
      <li key={id}>
        <Link to={`${Routes.PRODUCTS}/${category}`} className="drop-down__link">
          {" "}
          {title}
        </Link>
      </li>
    ))}
  </ul>
); */

export default ProductsDropDown;
