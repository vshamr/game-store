import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiExit, BiUser} from "react-icons/all";

import "../header/styles.css";
import { Routes } from "@/constants/Routes";
import { RootStateType } from "@/components/header";
import { logOutAC } from "@/redux/reducer";

function AuthorizedUser() {
  const userName = useSelector((state: RootStateType) => state.userName);
  const dispatch = useDispatch();

  const handleLogOut = () => dispatch(logOutAC());

  return (
    <div className="header_authorization-item">
        <Link to={Routes.USER_PAGE}>
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
