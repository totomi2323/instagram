import React from "react";
import "../../styles/profile.css"
import ProfileView from "../subComponents/ProfileView";

const Profile = (props) => {
  const {  actualUser , showPostOf} = props;

  return (
    <div className="profilePage">
     <ProfileView   actualUser={actualUser} showPostOf={showPostOf} />
    </div>
  );
};

export default Profile;
