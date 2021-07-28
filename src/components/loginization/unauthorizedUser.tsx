import { Link } from "react-router-dom";
import { Routes } from "@/constants/Routes";

const UnauthorizedUser = () => (
  <div className="header_nav-login">
    <span className="header_nav-link">
      <Link to={Routes.SIGN_IN}>Sign In</Link>
    </span>
    <span className="header_nav-link">
      <Link to={Routes.SIGN_UP}>Sign Up</Link>
    </span>
  </div>
);

export default UnauthorizedUser;
