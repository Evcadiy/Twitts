import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AddPost from "./pages/AddPost";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/add-post" Component={AddPost} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={RegisterPage} />
        <Route path="/reset" Component={ResetPasswordPage} />
      </Routes>
    </>
  );
};

export default App;
