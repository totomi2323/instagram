import React, { useEffect } from "react";
import mobilePicture from "../pictures/login-page-picture.jpg";
import logo from "../pictures/logo.png";
import "../styles/login.css";
import GoogleLogin from "./subComponents/GoogleLogin";
import GuestLogin from "./subComponents/GuestLogin";
import { useNavigate } from "react-router-dom";


const Login = (props) => {
  const {isLoggedIn, setGoogleLogin, setIsLoggedIn, setProfileData } = props;

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
          <GoogleLogin   setGoogleLogin={setGoogleLogin}/>
          <GuestLogin setIsLoggedIn= {setIsLoggedIn} setProfileData={setProfileData} />
        </div>
      </div>
    </div>
  );
};

export default Login;
