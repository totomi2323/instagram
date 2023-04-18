import React, { useState, useEffect } from "react";
import NavBar from "./mainModules/NavBar";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import Home from "./mainModules/Home";
const Main = (props) => {
  const { isLoggedIn, profilePicUrl } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div className="main">
      <NavBar profilePicUrl={profilePicUrl} />
      <Outlet/>
    </div>
  );
};

export default Main;
