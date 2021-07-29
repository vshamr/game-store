import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { Routes } from "@/constants/Routes";
import "../header/styles.css";
import { BiExit } from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "@/components/header/header";
import { logOutAC } from "@/redux/reducer";


function AuthorizedUser() {
  const userName = useSelector((state: RootStateType) => state.userName);
  const dispatch = useDispatch();

  const handleLogOut = () => dispatch(logOutAC());

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
