import "./styles.css";
import { Routes } from "@/constants/Routes";
import { NavLink, useLocation } from "react-router-dom";
import SearchBar from "@/components/searchBar/searchBar";
import { useEffect, useState } from "react";
import ProductsDropDown from "@/components/products/productsDropDown/productsDropDown";
import AuthorizedUser from "@/components/loginization/authorizedUser";
import UnauthorizedUser from "@/components/loginization/unauthorizedUser";
import { useDispatch, useSelector } from "react-redux";
import { getTargetPageAC } from "@/redux/reducer";


export type RootStateType = {
  isLoggedIn: boolean;
  userName: string
};

function Header() {
  const authorizedUser = useSelector((state: RootStateType) => state.isLoggedIn);
  const dispatch = useDispatch();

  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (!authorizedUser && location.pathname !== Routes.SIGN_IN) {
      dispatch(getTargetPageAC(location.pathname));
    }
  }, [location]);

  return (
    <header>
        <div className="header_top-logo">
          <h1>
            <span>Best Games</span> Market
          </h1>
          {authorizedUser ? <AuthorizedUser /> : <UnauthorizedUser />}
        </div>

      <div className="header_menu">
        <nav className="header_nav-menu">
          <span >
            <NavLink to={Routes.HOME} activeClassName="header_nav-activeLink">
              Home
            </NavLink>
          </span>
          <span
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <NavLink to={Routes.PRODUCTS} activeClassName="header_nav-activeLink">
              Products
              {showDropdown && <ProductsDropDown />}
            </NavLink>
          </span>
          <span>
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
