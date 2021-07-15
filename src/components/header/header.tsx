import { NavLink } from "react-router-dom";

export const home = "/home";
export const products = "/products";
export const about = "/about";

function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="header_container">
        <h1>Best Games Market</h1>
        <nav className="header_nav">
          <span className="header_nav-link">
            <NavLink to={home} activeClassName="header_nav-activeLink">
              Home
            </NavLink>
          </span>
          <span className="header_nav-link">
            <NavLink to={products} activeClassName="header_nav-activeLink">
              Products
            </NavLink>
          </span>
          <span className="header_nav-link">
            <NavLink to={about} activeClassName="header_nav-activeLink">
              About
            </NavLink>
          </span>
        </nav>
      </div>
    </header>
  );
}

export default Header;
