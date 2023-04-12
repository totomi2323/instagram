import React, { useEffect, useState } from "react";
import mobilePicture from "../pictures/login-page-picture.jpg";
import logo from "../pictures/logo.png";
import "../styles/login.css";
import GoogleLogin from "./subModules/GoogleLogin";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const {isLoggedIn } = props;

  const navigate = useNavigate();

  useEffect(() => {
      if (isLoggedIn) {
        navigate("/main");
      }
      console.log(isLoggedIn)
  }, [isLoggedIn]);

  return (
    <div className="login-container">
      <div className="image-container">
        <img
          alt="instagramPicture"
          src={mobilePicture}
          className="login-picture"
        ></img>
      </div>
      <div className="login">
        <img src={logo} className="login-logo" alt="Instagram Logo"></img>
        <div className="login-options">
          <GoogleLogin  />
          <p className="center or">or</p>
          <div className="guest-login">
            <input
              type="text"
              placeholder="Guest name"
              className="guest-name"
            ></input>
            <button className="login-button"> Login as guest </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
