import React, { useEffect } from "react";
import mobilePicture from "../pictures/login-page-picture.jpg";
import logo from "../pictures/logo.png";
import "../styles/login.css";
import GoogleLogin from "./subComponents/GoogleLogin";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const {isLoggedIn } = props;

  const navigate = useNavigate();

  useEffect(() => {
      if (isLoggedIn) {
        navigate("/main/home");
      }
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
        </div>
      </div>
    </div>
  );
};

export default Login;
