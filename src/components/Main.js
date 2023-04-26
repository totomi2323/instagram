import React, { useState, useEffect } from "react";
import NavBar from "./mainComponents/NavBar";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import Home from "./mainComponents/Home";
import CreatePost from "./mainComponents/CreatePost";
const Main = (props) => {
  const { isLoggedIn, profilePicUrl , profileData} = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div>
      <div className="main">
        <NavBar profilePicUrl={profilePicUrl} />
        <div>
          <Outlet />
        </div>
        <div>
          <p>valami</p>
        </div>
      </div>
      <div className="createBox hidden">
        <CreatePost profileData={profileData} />
      </div>
    </div>
  );
};

export default Main;
