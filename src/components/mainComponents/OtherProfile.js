import { useEffect, useState } from "react";
import ProfileView from "../subComponents/ProfileView";

const OtherProfile = (props) => {
  const { user } = props;

 
  const [profileData, setProfileData] = useState(false);

  return (
    <div className="profilePage">
      <ProfileView profileDetails={profileData} user={user} />
    </div>
  );
};

export default OtherProfile;
