import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import { CATEGORIES_DATA } from "@/constants/data";
import { Routes } from "@/constants/Routes";

function Categories() {
  return (
    <div className="categories">
      <h2 className="categories-title">Categories</h2>
      <div className="categories_container">
        <div className="categories-content">
          {CATEGORIES_DATA.map(({ id, category, title, icon }) => (
            <Link to={`${Routes.PRODUCTS}/${category}`} key={id}>
              <div className="categories-item">
                <div>{icon}</div>
                <h3>{title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Categories);
