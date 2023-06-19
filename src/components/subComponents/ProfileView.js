import uniqid from "uniqid";
import EnlargePost from "./EnlargePost";
import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import checkIfPostLiked from "../../functions/checkIfPostLiked";
import accountLogo from "../../pictures/svgs/account-box.svg"

const ProfileView = (props) => {
  const { actualUser, showPostOf} = props;


  const [posts, setPosts] = useState([])
  const [post, setPost] = useState({})
  const [profileRefresh, setProfileRefresh] = useState()
  const [profileData, setProfileData] = useState (false)



  const showPost = (post) => {
    let postElement = document.querySelector(".enlargedPost")
    postElement.style.visibility="visible"
    setPost(post)
  }

  useEffect(() => {
      setPosts([])
      const recentMessagesQuery = query(
        collection(getFirestore(), "posts"),
        orderBy("timestamp", "desc")
      );
    const loadPosts =  onSnapshot(recentMessagesQuery, function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "removed") {
          } else if (change.type === "added") {
            var message = change.doc.data();
            if (message.uploadedBy === showPostOf.UID) {
              message.liked = checkIfPostLiked(message.likes, showPostOf.UID)
                setPosts((prevState) => [...prevState, message]);
              if (profileData === false) {
                setProfileData({name: message.name, photoURL: message.profilePicUrl})
              }
            }
          }
        });
      });

    
    return () => {loadPosts()};
  }, [showPostOf, profileRefresh]);

  useEffect(()=> {
    setProfilePictureLogo()
  }, [])
  const setProfilePictureLogo = () => {
    let logo = document.querySelector(".profilePicture")
    if (profileData.photoURL) {
      logo.src = profileData.photoURL
    } else {
      logo.src = accountLogo
    }
  }

  return(
    <div>
      <div className="profileHeader">
        <img
          src={profileData.photoURL}
          className="profilePicture "
          alt="profile logo"
        ></img>
        <div className="profileInfo">
          <p className="bold">{profileData.name}</p>
          <p>
            <span className="bold">{posts.length}</span> posts
          </p>
        </div>
      </div>
      <div className="profilePosts">
        {posts.map((post) => {
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
      <EnlargePost post={post} user={actualUser} setPost={setPost} setProfileRefresh={setProfileRefresh}/>
    </div>
  )
};

export default ProfileView;
