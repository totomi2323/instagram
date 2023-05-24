import React from "react";
import "../../styles/profile.css"
import ProfileView from "../subComponents/ProfileView";

const Profile = (props) => {
  const {  profileData , user} = props;




  return (
    <div className="profilePage">
     <ProfileView   profileDetails={profileData} user={user} />
    </div>
  );
};

export default Profile;
