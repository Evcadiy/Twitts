import React, { useState } from "react";
import styles from "./Auth.module.scss";
import { handleResetPassword } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isReset, setIsReset] = useState(false);

  const resetPasswordHandler = (e) => {
    e.preventDefault();
    handleResetPassword(email);
    setEmail("");
    setIsReset(true);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={resetPasswordHandler}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className={styles.resetBtn}>Reset</button>
        {isReset && <p>Check your email</p>}
        <Link to={"/login"}>Return to login</Link>
      </form>
    </div>
  );
};
export default ResetPasswordPage;
