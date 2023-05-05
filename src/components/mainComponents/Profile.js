import React, { useEffect } from "react";
import "../../styles/profile.css"
import uniqid from "uniqid";

const Profile = (props) => {
  const { userPosts, profileData } = props;

  useEffect(() => {
    console.log(userPosts);
  }, [userPosts]);



  return (
    <div className="profilePage">
      <div className="profileHeader">
        <img src={profileData.photoURL} className="profilePicture" alt="profile"></img>
        <div className="profileInfo">
          <p className="bold">{profileData.name}</p>
          <p><span  className="bold">{userPosts.length}</span> posts</p>
        </div>
      </div>
      <div className="profilePosts">
        {userPosts.map((post)=> {
          return(
            <div className="pictureBox" key={uniqid()}>
              <img src={post.imageUrl} className="profilePostPicture" alt="user post"></img>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Profile;
