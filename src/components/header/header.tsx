import "./styles.css";
import { Routes } from "@/constants/Routes";
import { NavLink, useLocation } from "react-router-dom";
import SearchBar from "@/components/searchBar/searchBar";
import { useContext, useEffect, useState } from "react";
import ProductsDropDown from "@/components/products/productsDropDown/productsDropDown";
import AuthorizedUser from "@/components/loginization/authorizedUser";
import UnauthorizedUser from "@/components/loginization/unauthorizedUser";
import HeaderContext from "@/constants/headerContext";


function Header() {
  const { authorizedUser, userName, updateIsAuthorized, getTargetPage } = useContext(HeaderContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (!authorizedUser && location.pathname !== Routes.SIGN_IN) {
      getTargetPage(location.pathname);
    }
  }, [location]);

  return (
    <header>
      <div className="header_container">
        <h1>
          <span>Best Games</span> Market
        </h1>
        <nav>
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
        {authorizedUser ? (
          <AuthorizedUser userName={userName} updateIsAuthorized={updateIsAuthorized} />
        ) : (
          <UnauthorizedUser />
        )}
        <span className="header_searchBar">
          <SearchBar />
        </span>
      </div>
    </header>
  );
}

export default Header;
