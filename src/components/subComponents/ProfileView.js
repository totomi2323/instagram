import { useEffect, useState } from "react";

import uniqid from "uniqid";

const ProfileView = (props) => {
  const { userPosts, profileDetails } = props;


 useEffect(() => {
   console.log(userPosts)
 }, [])

  return(
    <div>
      <div className="profileHeader">
        <img
          src={profileDetails.photoURL}
          className="profilePicture"
          alt="profile"
        ></img>
        <div className="profileInfo">
          <p className="bold">{profileDetails.name}</p>
          <p>
            <span className="bold">{userPosts.length}</span> posts
          </p>
        </div>
      </div>
      <div className="profilePosts">
        {userPosts.map((post) => {
          return (
            <div className="pictureBox" key={uniqid()}>
              <img
                src={post.imageUrl}
                className="profilePostPicture"
                alt="user post"
              ></img>
            </div>
          );
        })}
      </div>
    </div>
  )
};

export default ProfileView;
