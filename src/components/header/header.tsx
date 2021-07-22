import "./header.css";
import { Routes } from "@/constants/Routes";
import { NavLink } from "react-router-dom";
import SearchBar from "@/components/searchBar/searchBar";
import { useState } from "react";
import ProductsDropDown from "@/components/products/productsDropDown/productsDropDown";

function Header(): JSX.Element {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <header>
      <div className="header_container">
        <h1>Best Games Market</h1>
        <nav className="header_nav">
          <span className="header_nav-link">
            <NavLink to={Routes.HOME} activeClassName="header_nav-activeLink">
              Home
            </NavLink>
          </span>

          <span
            className="header_nav-link"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <NavLink to={Routes.PRODUCTS} activeClassName="header_nav-activeLink">
              Products
              {showDropdown && <ProductsDropDown />}
            </NavLink>
          </span>

          <span className="header_nav-link">
            <NavLink to={Routes.ABOUT} activeClassName="header_nav-activeLink">
              About
            </NavLink>
          </span>
        </nav>
        <span className="header_searchBar">
          <SearchBar />
        </span>
      </div>
    </header>
  );
}

export default Header;
