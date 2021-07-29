import { Link } from "react-router-dom";
import { Routes } from "@/constants/Routes";

const UnauthorizedUser = () => (
  <div className="header_btn-authorization">
      <Link to={Routes.SIGN_IN}>Sign in</Link>
      <Link to={Routes.SIGN_UP} className="header_btn-signup">Sign up</Link>
  </div>
);

export default UnauthorizedUser;
