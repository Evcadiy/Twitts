import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import Header from "../components/Header/Header";

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
      <div>
        {isAuth ? (
          <div>
            <h1>Домашняя страница</h1>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default HomePage;
