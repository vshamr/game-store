import { Routes } from "@/constants/Routes";
import { NavLink } from "react-router-dom";


const Header = (): JSX.Element => (
    <header className="header">
      <div className="header_container">
        <h1>Best Games Market</h1>
        <nav className="header_nav">
          <span className="header_nav-link">
            <NavLink to={Routes.HOME} activeClassName="header_nav-activeLink">
              Home
            </NavLink>
          </span>
          <span className="header_nav-link">
            <NavLink to={Routes.PRODUCTS} activeClassName="header_nav-activeLink">
              Products
            </NavLink>
          </span>
          <span className="header_nav-link">
            <NavLink to={Routes.ABOUT} activeClassName="header_nav-activeLink">
              About
            </NavLink>
          </span>
        </nav>
      </div>
    </header>
  );

export default Header;
