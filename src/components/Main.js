import React, { useState, useEffect } from "react";
import NavBar from "./mainComponents/NavBar";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import Home from "./mainComponents/Home";
import CreatePost from "./mainComponents/CreatePost";
const Main = (props) => {
  const { isLoggedIn , profileData} = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  const logProfileData = () => {
    console.log(profileData)
  } 

  return (
    <div>
      <div className="main">
        <NavBar profileData={profileData} />
        <div>
          <Outlet />
        </div>
        <div>
          <p>valami</p>
          <button onClick={logProfileData}>asd</button>
        </div>
      </div>
      <div className="createBox hidden">
        <CreatePost profileData={profileData} />
      </div>
    </div>
  );
};

export default Main;
