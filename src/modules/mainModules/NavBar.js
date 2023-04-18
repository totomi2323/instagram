import React, { useEffect } from "react";
import GoogleLogout from "../subModules/GoogleLogout";
import logo from "../../pictures/logo.png";
import "../../styles/navbar.css";
import homeActive from "../../pictures/svgs/home.svg";
import homeInactive from "../../pictures/svgs/home-outline.svg";
import createActive from "../../pictures/svgs/plus-box.svg";
import createInactive from "../../pictures/svgs/plus-box-outline.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const { profilePicUrl } = props;

  const [homeSvg, setHomeSvg] = useState(homeActive);

  return (
    <div className="navBar">
      <img src={logo} alt="logo" className="instagramLogo"></img>
      <Link to="home">
        <div className="actionButton">
          <img src={homeSvg} alt="home" className="navBarSvg"></img>Home
        </div>
      </Link>

      <Link to="create">
        <div className="actionButton">
          <img src={createInactive} alt="Create" className="navBarSvg"></img>
          Create
        </div>
      </Link>

      <Link to="profile">
        <div className="actionButton">
          <img
            src={profilePicUrl}
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
