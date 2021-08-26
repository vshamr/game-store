import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiExit, BiUser } from "react-icons/all";

import "../header/styles.css";
import { Routes } from "@/constants/Routes";
import { logOutAC } from "@/redux/user-reducer";

function AuthorizedUser(): JSX.Element {
  const userName = useSelector((state) => state.userPage.userName);
  const dispatch = useDispatch();

  const handleLogOut = () => dispatch(logOutAC());

  return (
    <div className="header_authorization-item">
      <Link to={Routes.PROFILE_PAGE}>
        <BiUser /> {userName}
      </Link>
      <span onClick={handleLogOut}>
        <Link to={Routes.HOME}>
          <BiExit />
        </Link>
      </span>
    </div>
  );
}

export default AuthorizedUser;
