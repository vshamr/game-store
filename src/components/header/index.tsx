import { SyntheticEvent, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./styles.css";
import SearchBar from "@/components/searchBar";
import ProductsDropDown from "@/components/header/drop-down";
import AuthorizedUser from "@/components/loginization/authorizedUser";
import UnauthorizedUser from "@/components/loginization/unauthorizedUser";
import { Routes } from "@/constants/Routes";
import { getTargetPageAC } from "@/redux/reducer";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/all";
import useDebounce from "@/constants/useDebounce";
import { urlProducts } from "@/api/api";
import Loader from "@/components/searchBar/loader";

export type RootStateType = {
  isLoggedIn: boolean;
  userName: string;
  userId: number;
  userPassword: string;
};

function Header() {
  const authorizedUser = useSelector((state: RootStateType) => state.isLoggedIn);
  const dispatch = useDispatch();

  const [nameOfGame, setNameOfGame] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [games, setGames] = useState([]);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const debouncedNameOfTheGame = useDebounce(nameOfGame, 300);

  useEffect(() => {
    if (!nameOfGame) {
      setGames([]);
      return;
    }

    const getGames = async () => {
      setIsSearching(true);
      const data = await fetch(`${urlProducts}?title_like=${debouncedNameOfTheGame}`);
      const response = await data.json();

      setGames(response);
      setIsSearching(false);
    };

    getGames();
  }, [debouncedNameOfTheGame]);
  const showDropDownMenu = () => setIsDropDownOpen(true);
  const hideDropDownMenu = () => setIsDropDownOpen(false);

  const handleOnSubmit = (e: SyntheticEvent) => e.preventDefault();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setNameOfGame(e.target.value);

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
        </nav>
        {/*<span className="header_searchBar">
          <SearchBar handleOnSubmit={handleOnSubmit} handleOnChange={handleOnChange} nameOfTheGame={nameOfGame} />
          {isSearching && <Loader />}
          {debouncedNameOfTheGame.length !== 0 && games.length === 0 && (
            <div className="not-found">Nothing was found</div>
          )}
        </span>*/}
      </div>
    </header>
  );
}

export default Header;
