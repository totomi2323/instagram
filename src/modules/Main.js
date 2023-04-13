import React, { useState, useEffect } from "react";
import NavBar from "./mainModules/NavBar";
import { useNavigate } from "react-router-dom";
import "../styles/main.css"

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
      <div ></div>
    </div>
  );
};

export default Main;
