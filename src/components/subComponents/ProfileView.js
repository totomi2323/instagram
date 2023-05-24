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

const ProfileView = (props) => {
  const {  profileDetails , user} = props;

  const [post, setPost] = useState({})
  const [profileRefresh, setProfileRefresh] = useState()
  const [profileData, setProfileData] = useState (false)
  const [posts, setPosts] = useState([])


  const showPost = (post) => {
    let postElement = document.querySelector(".enlargedPost")
    postElement.style.visibility="visible"
    setPost(post)
  }

  useEffect(() => {
    function loadPosts() {
      setPosts([])
      const recentMessagesQuery = query(
        collection(getFirestore(), "posts"),
        orderBy("timestamp", "desc")
      );
      
      onSnapshot(recentMessagesQuery, function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "removed") {
          } else {
            var message = change.doc.data();
            if (message.uploadedBy === user.UID) {
              console.log(message)
                setPosts((prevState) => [...prevState, message]);
              if (profileData === false) {
                setProfileData({name: message.name, photoURL: message.profilePicUrl})
              }
            }
          }
        });
      });

    }
    return () => {loadPosts()};
  }, [user, profileRefresh]);


  return(
    <div>
      <div className="profileHeader">
        <img
          src={profileData.photoURL}
          className="profilePicture"
          alt="profile"
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
      <EnlargePost post={post} user={user} setPost={setPost} setProfileRefresh={setProfileRefresh}/>
    </div>
  )
};

export default ProfileView;
