import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./_navbar.scss";
import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

import { login } from "../../store/actions/authAction";
import { getUser } from "../../store/slices/authSlice";

const Navbar = ({ handleToggleSidebar }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${input}`);
  };

  const { photoURL } = useSelector((state) => {
    return state?.auth.user || false;
  });

  const user = useSelector(getUser);

  const handleLogin = () => {
    if (user) {
      return;
    }
    dispatch(login());
  };

  return (
    <div className="navbar d-flex justify-content-between px-4 flex-nowrap">
      <FaBars
        className="navbar__menu"
        size={26}
        onClick={() => handleToggleSidebar()}
      />

      <Link to="/">
        <img
          src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
          alt=""
          className="navbar__logo"
        />
      </Link>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <dic className="navbar__icons">
        {user ? (
          photoURL ? (
            <img src={photoURL} alt="ava" />
          ) : (
            <CgProfile />
          )
        ) : (
          <button onClick={handleLogin}>Sign in</button>
        )}
      </dic>
    </div>
  );
};

export default Navbar;
