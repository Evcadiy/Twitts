import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import styles from "./Auth.module.scss";

import { setUser } from "../redux/userSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      dispatch(setUser(userData));
      navigate("/");
    }
  }, [dispatch, navigate]);

  const formHandler = (e) => {
    e.preventDefault();
  };

  const loginHandler = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pass)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            token: user.accessToken,
            id: user.uid,
          })
        );

        localStorage.setItem(
          "authUser",
          JSON.stringify({
            email: user.email,
            token: user.accessToken,
            id: user.uid,
          })
        );

        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error.message);
        setError("Error: Invalid login or password");
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={formHandler} className={styles.form}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit" onClick={loginHandler}>
          Отправить
        </button>
        <p>
          Or <Link to="/register">Register</Link>
        </p>
        <p>
          Forgot password <Link to="/reset">Reset</Link>
        </p>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
