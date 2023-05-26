import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  setDoc,
  doc,
  arrayUnion,
  updateDoc,
  serverTimestamp,
  arrayRemove,
} from "firebase/firestore";
import uniqid from "uniqid";
import likebutton from "../../pictures/svgs/heart-outline.svg";
import checkIfPostLiked from "../../functions/checkIfPostLiked";
import "../../styles/home.css";
import commentTiming from "../../functions/commentTiming";

const Home = (props) => {
  const { profileData, setUserPosts, setHomeRefresh } = props;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const recentMessagesQuery = query(
      collection(getFirestore(), "posts"),
      orderBy("timestamp", "desc")
    );
    setPosts([]);
    const unsubcribe = onSnapshot(recentMessagesQuery, function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        if (change.type === "removed") {
        } else {
          let message = change.doc.data();

          message.liked = checkIfPostLiked(message.likes, profileData.UID);

          setPosts((prevState) => [...prevState, message]);
        }
      });
    });

    uploadUserInfo();
    return () => {
      unsubcribe();
    };
  }, []);

  const addComment = async (e) => {
    if (e.target.previousElementSibling.value) {
      console.log(e.target.previousElementSibling.value)
      let reference = e.target.getAttribute(["data-id"]);
      const commentReference = doc(getFirestore(), "posts", reference);
      let comment = {
        comment: e.target.previousElementSibling.value,
        id: uniqid(),
        time: new Date(),
        name: profileData.name,
      };
  
      await updateDoc(commentReference, { comments: arrayUnion(comment) });
      setHomeRefresh(uniqid());
    }
   
  };

  const likeButtonEvent = async (e) => {
    let postReference = e.target.getAttribute(["data-id"]);
    let check = e.target.classList.contains("liked");
    const likeReferenceForPost = doc(getFirestore(), "posts", postReference);
    const likeReferenceForUser = doc(getFirestore(), "users", profileData.UID);

    if (check) {
      await updateDoc(likeReferenceForPost, {
        likes: arrayRemove(profileData.UID),
      });
      await updateDoc(likeReferenceForUser, {
        liked: arrayRemove(postReference),
      });
    } else {
      await updateDoc(likeReferenceForPost, {
        likes: arrayUnion(profileData.UID),
      });
      await updateDoc(likeReferenceForUser, {
        liked: arrayUnion(postReference),
      });
    }
    setHomeRefresh(uniqid());
  };

  useEffect(() => {
    setUserPosts([]);
    Object.keys(posts).map((post) => {
      if (posts[post].uploadedBy === profileData.UID) {
        setUserPosts((prevState) => [...prevState, posts[post]]);
      }
    });
  }, [posts]);

  async function uploadUserInfo() {
    try {
      if (profileData.UID !== undefined) {
        const userRef = doc(getFirestore(), "users/" + profileData.UID);
        await setDoc(userRef, { profileData });
      }
    } catch (error) {
      console.error("There was an error updating user informations:", error);
    }
  }

  return (
    <div className="homePage">
      <div className="postsPage">
        {posts.map((post) => {
          return (
            <div className="post" key={uniqid()}>
              <div className="postHeader">
                <img
                  src={post.profilePicUrl}
                  alt="userImage"
                  className="userPics"
                ></img>
                <p>{post.name}</p>

                <p className="postTime"> • {commentTiming(post.postDate)}</p>
              </div>
              <img
                src={post.imageUrl}
                className="postPicture"
                alt={post.description}
              ></img>
              {post.liked ? (
                <img
                  src={likebutton}
                  alt={"Like button"}
                  className="likeButton liked"
                  data-id={post.id}
                  onClick={likeButtonEvent}
                ></img>
              ) : (
                <img
                  src={likebutton}
                  alt={"Like button"}
                  className="likeButton"
                  data-id={post.id}
                  onClick={likeButtonEvent}
                ></img>
              )}
              {post.likes ? (
                <p className="bold"> {post.likes.length} likes </p>
              ) : (
                <></>
              )}
              <p>{post.description}</p>
              <div className="comments" key={uniqid()}>
                {post.comments ? (
                  Object.keys(post.comments).map((com) => {
                    return (
                      <div className="comment" key={uniqid()}>
                        <p className="commentUser">
                          {post.comments[com].name} :
                        </p>
                        <p>{post.comments[com].comment}</p>
                        <p className="commentTime">
                          {commentTiming(post.comments[com].time)}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
                <div className="addCommentContainer">
                  <textarea
                    placeholder="Add comment..."
                    className="commentInput"
                  ></textarea>
                  <button
                    data-id={post.id}
                    onClick={addComment}
                    className="addComment"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
