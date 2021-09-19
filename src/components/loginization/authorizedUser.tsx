import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUser, ImExit } from "react-icons/all";

import "../header/styles.css";
import { Routes } from "@/constants/Routes";
import { logOut } from "@/redux/user-reducer";
import { ReducersType } from "@/redux/redux-store";

function AuthorizedUser(): JSX.Element {
  const userName = useSelector((state: ReducersType) => state.userPage.userName);
  const dispatch = useDispatch();

  const handleLogOut = () => dispatch(logOut());

  return (
    <div className="header_authorization-item">
      <Link to={Routes.PROFILE_PAGE}>
        <FaRegUser /> {userName}
      </Link>
      <span onClick={handleLogOut}>
        <Link to={Routes.HOME}>
          <ImExit />
        </Link>
      </span>
    </div>
  );
}

export default AuthorizedUser;
