import { Link } from "react-router-dom";
import { useState } from "react";
import ProductsData from "./productsData";
import "./productsDropDown.css";

function ProductsDropDown(): JSX.Element {
  const [click, setClick] = useState(false);
  return (
    <>
      <ul className={click ? "drop-down visible" : "drop-down"}>
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

export default ProductsDropDown;
