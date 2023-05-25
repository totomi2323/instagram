import { useEffect, useState } from "react";
import ProfileView from "../subComponents/ProfileView";

const OtherProfile = (props) => {
  const { showPostOf, actualUser } = props;


  return (
    <div className="profilePage">
      <ProfileView  showPostOf={showPostOf} actualUser={actualUser} />
    </div>
  );
};

export default OtherProfile;
