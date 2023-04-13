import React, { useEffect } from "react";
import GoogleLogout from "../subModules/GoogleLogout";
import logo from "../../pictures/logo.png";
import "../../styles/navbar.css";
import homeActive from "../../pictures/svgs/home.svg";
import homeInactive from "../../pictures/svgs/home-outline.svg";
import createActive from "../../pictures/svgs/plus-box.svg";
import createInactive from "../../pictures/svgs/plus-box-outline.svg";
import { useState } from "react";

const NavBar = (props) => {
  const { profilePicUrl } = props;

  const [homeSvg, setHomeSvg] = useState(homeActive);

  return (
    <div className="navBar">
      <img src={logo} alt="logo" className="instagramLogo"></img>

      <div className="actionButton">
        <img src={homeSvg} alt="home" className="navBarSvg"></img>Home
      </div>

      <div className="actionButton">
        <img src={createInactive} alt="home" className="navBarSvg"></img>
        Create
      </div>

      <div className="actionButton">
        <img
          src={profilePicUrl}
          alt="profilePicture"
          className="profileLogo"
        ></img>
        Profile
      </div>

      <GoogleLogout />
    </div>
  );
};

export default NavBar;
