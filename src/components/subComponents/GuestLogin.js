import React from "react";
import uniqid from "uniqid";
import guestLogo from "../../pictures/svgs/account-circle-outline.svg"

const GuestLogin = (props) => {
    const {setIsLoggedIn, setProfileData} = props;
  const signIn = () => {
   
    let loginName = document.querySelector(".guestName")
    
    if (!loginName.value) {
        console.log("no value")
    } else {
        console.log(loginName.value)
        setIsLoggedIn(true)
        setProfileData({
            name:loginName.value, 
            UID: uniqid(),
            photoURL: guestLogo
        })
    }
  };

  return (
    <div className="login-options">
        <input type={"text"} className="guestName" placeholder="Guest Name"></input>
      <button className="login-button" onClick={signIn}>
        Login as Guest{" "}
      </button>
    </div>
  );
};

export default GuestLogin;
