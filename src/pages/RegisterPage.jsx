import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import styles from "./Auth.module.scss";
import { setUser } from "../redux/userSlice";
import useAuth from "../hooks/use-auth";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

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
        setError("Error: Invalid email or password");
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={formHandler} className={styles.form}>
        <h1>Register</h1>
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
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
