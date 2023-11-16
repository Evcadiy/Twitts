// RegisterPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import styles from "./Auth.module.scss";
import { setUser } from "../redux/userSlice";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const formHandler = (e) => {
    e.preventDefault();
  };

  const registerHandler = (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pass)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            token: user.accessToken,
            id: user.uid,
          })
        );
        navigate("/");
      })
      .catch(console.error);
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={formHandler} className={styles.form}>
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
        <button type="submit" onClick={registerHandler}>
          Отправить
        </button>
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </>
  );
};

export default RegisterPage;
