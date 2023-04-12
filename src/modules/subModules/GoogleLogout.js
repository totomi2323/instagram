import React, { useEffect } from "react";

import { getAuth, signOut } from "firebase/auth";

const GoogleLogout = (props) => {
  function signOutUser() {
    signOut(getAuth());
  }

  return (
    <button className="logout-button" onClick={signOutUser}>
      LogOut{" "}
    </button>
  );
};

export default GoogleLogout;
