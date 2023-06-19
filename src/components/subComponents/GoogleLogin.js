import React from "react";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";


const GoogleLogin = (props) => {
 const {setGoogleLogin}  = props;

  async function signIn() {
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
    setGoogleLogin(true);
  }
  return (
      <button className="login-button"  onClick={signIn}>Login with Google </button>
  );
};

export default GoogleLogin;
