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
  return (
      <button className="login-button"  onClick={signIn}>Login with Google </button>
  );
};

export default GoogleLogin;
