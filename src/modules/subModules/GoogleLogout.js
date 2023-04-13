import React, { useEffect } from "react";
import logoutSvg from "../../pictures/svgs/logout.svg"

import { getAuth, signOut } from "firebase/auth";

const GoogleLogout = (props) => {
  function signOutUser() {
    signOut(getAuth());
  }

  return (
    <div className="logout-button actionButton" onClick={signOutUser}>
      <img src={logoutSvg} alt="logout" className="navBarSvg"></img>
      Logout
    </div>
  );
};

export default GoogleLogout;
