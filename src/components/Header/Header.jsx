import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./Header.module.scss";

import { removeUser } from "../../redux/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const remove = () => {
    dispatch(removeUser());
    localStorage.removeItem("authUser");
    navigate("/login");
  };

  return (
    <header>
      <div className={styles.container}>
        <ul>
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Home
            </NavLink>
            <NavLink
              to={"/add-post"}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Add Post
            </NavLink>
          </li>
        </ul>
        <button className={styles.removeBtn} onClick={remove}>
          Log out
        </button>
      </div>
    </header>
  );
};

export default Header;
