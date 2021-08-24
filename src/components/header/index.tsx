import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./styles.css";
import ProductsDropDown from "@/components/header/drop-down";
import AuthorizedUser from "@/components/loginization/authorizedUser";
import UnauthorizedUser from "@/components/loginization/unauthorizedUser";
import { Routes } from "@/constants/Routes";
import { getTargetPageAC } from "@/redux/user-reducer";
import { CgShoppingCart, TiArrowSortedDown, TiArrowSortedUp } from "react-icons/all";

export type RootStateType = {
  isLoggedIn: boolean;
  userName: string;
  userId: number;
  userPassword: string;
  cart: [];
};

function Header(): JSX.Element {
  const authorizedUser = useSelector((state: RootStateType) => state.isLoggedIn);
  const cart = useSelector((state: RootStateType) => state.cart);
  const dispatch = useDispatch();

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const showDropDownMenu = () => setIsDropDownOpen(true);
  const hideDropDownMenu = () => setIsDropDownOpen(false);

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
          <NavLink to={Routes.HOME} activeClassName="header_nav-activeLink">
            Home
          </NavLink>
          <span onMouseEnter={showDropDownMenu} onMouseLeave={hideDropDownMenu}>
            <NavLink to={Routes.PRODUCTS} activeClassName="header_nav-activeLink">
              Products
              {isDropDownOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
            </NavLink>
            {isDropDownOpen && <ProductsDropDown />}
          </span>
          <NavLink to={Routes.ABOUT} activeClassName="header_nav-activeLink">
            About
          </NavLink>
          <NavLink to={Routes.CART} activeClassName="header_nav-activeLink">
            <CgShoppingCart />
           {/* {cart.length}*/}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
