import React from "react";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";


const GoogleLogin = () => {

  async function signIn() {
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }
  return (
      <button className="login-button"  onClick={signIn}>Login with Google </button>
  );
};

export default GoogleLogin;
