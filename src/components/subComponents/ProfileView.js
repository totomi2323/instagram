import uniqid from "uniqid";
import EnlargePost from "./EnlargePost";
import { useState } from "react";

const ProfileView = (props) => {
  const { userPosts, profileDetails } = props;

  const [post, setPost] = useState({})

  const showPost = (post) => {
    let postElement = document.querySelector(".enlargedPost")
    postElement.style.visibility="visible"
    setPost(post)
  }

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
            <div className="pictureBox" key={uniqid()} onClick={()=> {showPost(post)}}>
              <img
                src={post.imageUrl}
                className="profilePostPicture"
                alt="user post"
              ></img>
            </div>
          );
        })}
      </div>
      <EnlargePost post={post}/>
    </div>
  )
};

export default ProfileView;
