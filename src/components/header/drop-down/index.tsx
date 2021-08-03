import { useState } from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import { PRODUCTS_DATA } from "@/constants/data";

function ProductsDropDown(): JSX.Element {
  const [click, setClick] = useState(false);
  return (
    <>
      <ul className={click ? "drop-down-visible" : "drop-down"}>
        {PRODUCTS_DATA.map((item, index) => (
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
