import React, { useEffect } from "react";
import Login from "../components/Login/Login.jsx";
import { useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticatedUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticatedUser === true) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
