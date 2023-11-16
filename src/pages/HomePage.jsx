// HomePage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/use-auth";
import { useDispatch } from "react-redux";
import { setUser, removeUser } from "../redux/userSlice";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, isAuth } = useAuth();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  const remove = () => {
    console.log("Выход из системы");
    dispatch(removeUser());
    console.log("После выхода из системы");
  };

  return (
    <div>
      {isAuth ? (
        <div>
          <h1>Домашняя страница</h1>
          <button onClick={remove}>Remove</button>
        </div>
      ) : null}
    </div>
  );
};

export default HomePage;
