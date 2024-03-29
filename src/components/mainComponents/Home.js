import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  arrayUnion,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import uniqid from "uniqid";
import checkIfPostLiked from "../../functions/checkIfPostLiked";
import "../../styles/home.css";
import commentTiming from "../../functions/commentTiming";


const Home = (props) => {
  const { profileData } = props;

  const [posts, setPosts] = useState([]);

  const recentMessagesQuery = query(
    collection(getFirestore(), "posts"),
    orderBy("timestamp", "desc")
  );

  useEffect(() => {
    const unsubcribe = onSnapshot(recentMessagesQuery, function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        if (change.type === "removed") {
        } else if (change.type === "added") {
          let message = change.doc.data();
          message.liked = checkIfPostLiked(message.likes, profileData.UID);
          setPosts((prevState) => [...prevState, message]);
        }
      });
    });

    return () => {
      unsubcribe();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }, []);

  useEffect(() => {
    const changeListener = onSnapshot(recentMessagesQuery, function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        if (change.type === "modified") {
          let postChange = change.doc.data();
          let copyOfPosts = posts;
          let index;
          let newPost = true;
          copyOfPosts.forEach((post) => {
            if (post.id === postChange.id) {
              newPost = false;
              index = posts.indexOf(post);
              postChange.liked = checkIfPostLiked(postChange.likes, profileData.UID);
              copyOfPosts[index] = postChange;
              setPosts([...copyOfPosts])
            } 
          });
          if (newPost) {
            let message = change.doc.data();
            message.liked = checkIfPostLiked(message.likes, profileData.UID);
            copyOfPosts.unshift(message)
            setPosts([...copyOfPosts])
          }
        }
      });
    });

    return () => {
      changeListener();
    };
  } );

  useEffect(() => {
    const setEventOnLikeButton = () => {
      let likeButtons = document.querySelectorAll(".likeButton");
      likeButtons.forEach((likeButton) => {
        likeButton.addEventListener("click", likeButtonEvent);
      });
    };
    setEventOnLikeButton();
  });

  const addComment = async (e) => {
    if (e.target.previousElementSibling.value) {
      let reference = e.target.getAttribute(["data-id"]);
      const commentReference = doc(getFirestore(), "posts", reference);
      let comment = {
        comment: e.target.previousElementSibling.value,
        id: uniqid(),
        time: new Date(),
        name: profileData.name,
      };
      await updateDoc(commentReference, { comments: arrayUnion(comment) });
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
  };

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
                  alt={"Like button"}
                  className="likeButton liked"
                  data-id={post.id}
                ></img>
              ) : (
                <img
                  alt={"Like button"}
                  className="likeButton"
                  data-id={post.id}
                ></img>
              )}
              {post.likes ? (
                <p className="bold likeCounter"> {post.likes.length} likes </p>
              ) : (
                <></>
              )}
              <p className="postTitle">{post.description}</p>
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
