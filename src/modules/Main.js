import React, { useState, useEffect } from "react";
import NavBar from "./mainModules/NavBar";
import { useNavigate } from "react-router-dom";

const Main = (props) => {
  const { setIsLoggedIn, isLoggedIn } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    console.log(isLoggedIn)
  }, [isLoggedIn]);


  
  return <NavBar  />;
};

export default Main;
