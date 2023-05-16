import React from "react";
import "../../styles/profile.css"
import ProfileView from "../subComponents/ProfileView";

const Profile = (props) => {
  const { userPosts, profileData } = props;




  return (
    <div className="profilePage">
     <ProfileView  userPosts={userPosts} profileDetails={profileData} />
    </div>
  );
};

export default Profile;
