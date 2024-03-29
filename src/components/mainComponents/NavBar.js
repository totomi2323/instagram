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
import toggleCreateBox from "../../functions/toggleCreateBox";
import accountLogo from "../../pictures/svgs/account-box.svg";

const NavBar = (props) => {
  const { profileData, createInvisible, setCreateInvisible, setIsLoggedIn } =
    props;

  const [homeSvg, setHomeSvg] = useState(homeActive);
  const [createSvg, setCreateSvg] = useState(createInactive);
  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    let profileButton = document.querySelector(".profileButton");

    switch (activePage) {
      case "home":
        setHomeSvg(homeActive);
        setCreateSvg(createInactive);
        profileButton.classList.remove("bold");
        break;
      case "create":
        setHomeSvg(homeInactive);
        setCreateSvg(createActive);
        profileButton.classList.remove("bold");
        break;
      case "profile":
        setHomeSvg(homeInactive);
        setCreateSvg(createInactive);
        profileButton.classList.add("bold");
        break;
      default:
        console.log("No change");
    }
  }, [activePage]);

  useEffect(() => {
    setProfileButtonLogo();
  }, []);

  useEffect(() => {
    const change = () => {
      if (createInvisible === false) {
        setActivePage("create");
      } else {
        setActivePage("home");
      }
    };

    return () => change();
  }, [createInvisible]);

  const highLightButton = (e) => {
    setActivePage(e.target.getAttribute("data-id"));
  };

  const setProfileButtonLogo = () => {
    let logo = document.querySelector(".profileLogo");
    if (profileData.photoURL) {
      logo.src = profileData.photoURL;
    } else {
      logo.src = accountLogo;
    }
  };

  return (
    <div className="navBar">
      <img src={logo} alt="logo" className="instagramLogo"></img>
      <Link
        to="home"
        className="link actionButton"
        data-id="home"
        onClick={highLightButton}
      >
        <img src={homeSvg} alt="home" className="navBarSvg"></img>Home
      </Link>
      <div
        className="actionButton link"
        onClick={(e) => {
          highLightButton(e);
          toggleCreateBox(setCreateInvisible, createInvisible);
        }}
        data-id="create"
      >
        <img src={createSvg} alt="Create" className="navBarSvg"></img>
        Create
      </div>

      <Link
        to="profile"
        className="actionButton profileButton link"
        data-id="profile"
        onClick={highLightButton}
      >
        <img src="#" alt="profileLogo" className="profileLogo"></img>
        Profile
      </Link>
      <GoogleLogout setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
};

export default NavBar;
