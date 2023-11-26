import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../../store/slices/authSlice";

import "./_sidebar.scss";
import {
  MdSubscriptions,
  MdExitToApp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
} from "react-icons/md";

import { login, logOut } from "../../store/actions/authAction";

const Sidebar = ({ sidebar, handleToggleSidebar }) => {
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(logOut());
    alert(userLoggedIN, "oops");
  };

  const logInHandler = () => {
    dispatch(login());
  };

  const userLoggedIN = useSelector(isLoggedIn);

  return (
    <nav
      className={sidebar ? "sidebar open" : "sidebar"}
      onClick={() => handleToggleSidebar(false)}
    >
      <Link to="/">
        <li>
          <MdHome size={23} />
          <span>Home</span>
        </li>
      </Link>
      <Link to="/subscriptions">
        <li>
          <MdSubscriptions size={23} />
          <span>Subscriptions</span>
        </li>
      </Link>

      <hr />
      {userLoggedIN ? (
        <li onClick={logOutHandler}>
          <MdExitToApp size={23} />
          <span>Log Out</span>
        </li>
      ) : (
        <li onClick={logInHandler}>
          <MdExitToApp size={23} />
          <span>Sign in</span>
        </li>
      )}

      <hr />
    </nav>
  );
};

export default Sidebar;
