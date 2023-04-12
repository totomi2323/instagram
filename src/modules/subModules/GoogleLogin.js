import React, { useEffect } from "react";

import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";


const GoogleLogin = (props) => {


  async function signIn() {
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }

  function getProfilePicUrl() {
    return getAuth().currentUser.photoURL || "/images/profile_placeholder.png";
  }
  function getUserName() {
    return getAuth().currentUser.displayName;
  }
  function addSizeToGoogleProfilePic(url) {
    if (
      url.indexOf("googleusercontent.com") !== -1 &&
      url.indexOf("?") === -1
    ) {
      return url + "?sz=150";
    }
    return url;
  }

 
  return (
      <button className="login-button"  onClick={signIn}>Login with Google </button>
  );
};

export default GoogleLogin;
