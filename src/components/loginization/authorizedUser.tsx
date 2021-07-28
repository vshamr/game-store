import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import { Routes } from "@/constants/Routes";
import "../header/header.css";
import { BiExit } from "react-icons/all";

type AuthorizedUserPropsType = {
  userName: string;
  updateIsAuthorized: Function;
};

function AuthorizedUser({ userName, updateIsAuthorized}: AuthorizedUserPropsType) {
  const handleLogOut = () => updateIsAuthorized(false);

  return (
    <div className="authorizedUser">
      <span className="header_nav-link">
        <Link to={Routes.USER_PAGE}>
          <FaUserCircle /> {userName}
        </Link>
      </span>
      <span onClick={handleLogOut} className="header_nav-link">
        <Link to={Routes.HOME}>
          <BiExit />
        </Link>
      </span>
    </div>
  );
}

export default AuthorizedUser;
