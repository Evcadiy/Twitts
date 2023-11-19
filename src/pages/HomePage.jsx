import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

import styles from "./HomePage.module.scss";

import Header from "../components/Header/Header";
import PostsList from "../components/PostsList/PostsList";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useAuth();

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      dispatch(setUser(userData));
    }

    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, dispatch, navigate]);

  return (
    <>
      <Header />
      <div className={styles.container}>{isAuth ? <PostsList /> : null}</div>
    </>
  );
};

export default HomePage;
