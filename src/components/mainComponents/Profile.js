import React, { useEffect } from "react";
import "../../styles/profile.css"
import uniqid from "uniqid";
import ProfileView from "../subComponents/ProfileView";

const Profile = (props) => {
  const { userPosts, profileData } = props;

  useEffect(() => {
    console.log(profileData);
  }, [userPosts]);



  return (
    <div className="profilePage">
     <ProfileView  userPosts={userPosts} profileDetails={profileData} />
    </div>
  );
};

export default Profile;
