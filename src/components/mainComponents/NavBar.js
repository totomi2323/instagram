import React, { useEffect } from "react";
import GoogleLogout from "../subComponents/GoogleLogout";
import logo from "../../pictures/logo.png";
import "../../styles/navbar.css";
import homeActive from "../../pictures/svgs/home.svg";
import homeInactive from "../../pictures/svgs/home-outline.svg";
import createActive from "../../pictures/svgs/plus-box.svg";
import createInactive from "../../pictures/svgs/plus-box-outline.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const { profileData } = props;

  const [homeSvg, setHomeSvg] = useState(homeActive);
  const [profilePics, setProfilePics] = useState("#")

  const toggleCreateDisplay =  () => {
    let createBox =  document.querySelector(".createBox");
    let blurMain = document.querySelector(".main");
    createBox.classList.toggle("hidden");
    blurMain.classList.toggle("blur")
   }
   useEffect(( )=> {
      setProfilePics(profileData.userPhoto)
   } ,[profileData])

  return (
    <div className="navBar">
      <img src={logo} alt="logo" className="instagramLogo"></img>
      <Link to="home" className="link">
        <div className="actionButton">
          <img src={homeSvg} alt="home" className="navBarSvg"></img>Home
        </div>
      </Link>

      <div className="actionButton link" onClick={toggleCreateDisplay}>
        <img src={createInactive} alt="Create" className="navBarSvg"></img>
        Create
      </div>

      <Link to="profile" className="link">
        <div className="actionButton">
          <img
            src={profilePics}
            alt="profilePicture"
            className="profileLogo"
          ></img>
          Profile
        </div>
      </Link>

      <GoogleLogout />
    </div>
  );
};

export default NavBar;
