import uniqid from "uniqid";
import likebutton from "../../pictures/svgs/heart-outline.svg";
import { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  arrayUnion,
  updateDoc,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import PostTiming from "./PostTime";
import commentTiming from "../../functions/commentTiming";
const EnlargePost = (props) => {
  const { post, setPost, setProfileRefresh, user } = props;

  const [refresh, setRefresh] = useState();

  const addComment = async (e) => {
    if (e.target.previousElementSibling.value) {
      let reference = e.target.getAttribute(["data-id"]);
      const commentReference = doc(getFirestore(), "posts", reference);
      let comment = {
        comment: e.target.previousElementSibling.value,
        id: uniqid(),
        name: user.name,
        time: new Date(),
      };

      await updateDoc(commentReference, { comments: arrayUnion(comment) });
      setRefresh(uniqid());
      refreshPost();
      document.querySelector(".commentInput").value = "";
    }
  };

  const refreshPost = async () => {
    const postReference = doc(getFirestore(), "posts", post.id);
    let refreshdPost = await getDoc(postReference);

    if (refreshdPost.exists()) {
      setPost(refreshdPost.data());
    }
  };
  const closePost = () => {
    let postElement = document.querySelector(".enlargedPost");
    postElement.style.visibility = "hidden";
    setProfileRefresh(uniqid());
    refreshPost();
  };

  const likeButtonEvent = async (e) => {
    let postReference = e.target.getAttribute(["data-id"]);
    let check = e.target.classList.contains("liked");
    const likeReferenceForPost = doc(getFirestore(), "posts", postReference);
    const likeReferenceForUser = doc(getFirestore(), "users", user.UID);

    if (check) {
      await updateDoc(likeReferenceForPost, {
        likes: arrayRemove(user.UID),
      });
      await updateDoc(likeReferenceForUser, {
        liked: arrayRemove(postReference),
      });
      e.target.classList.toggle("liked");

      setRefresh(uniqid());
    } else {
      await updateDoc(likeReferenceForPost, {
        likes: arrayUnion(user.UID),
      });
      await updateDoc(likeReferenceForUser, {
        liked: arrayUnion(postReference),
      });
      e.target.classList.toggle("liked");

      setRefresh(uniqid());
    }
  };

  return (
    <div className="enlargedPost">
      <div className="pictureContainer">
        <img
          src={post.imageUrl}
          alt={post.description}
          className="enlargedPostPicture"
        ></img>
      </div>
      <div className="postInfoContainer" onClick={() => {}}>
        <div className="postHeader bottomLine">
          <img
            src={post.profilePicUrl}
            className="postUserPics"
            alt={post.name}
          ></img>
          <p className="bold">{post.name}</p>
        </div>
        <div className="postCommentContainer">
          {post.comments ? (
            Object.keys(post.comments).map((com) => {
              return (
                <div key={uniqid()}>
                  <p>
                    <span className="commentUser">
                      {post.comments[com].name}
                    </span>
                    <span className="comment">
                      {post.comments[com].comment}
                    </span>
                    <span className="commentTime">
                      {commentTiming(post.comments[com].time)}
                    </span>
                  </p>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
        <div className="postLikeContainer">
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
          {post.postDate ? <PostTiming time={post.postDate} /> : <></>}
        </div>
        <div className="addCommentContainer">
          <textarea
            placeholder="Add comment..."
            className="commentInput"
          ></textarea>
          <button data-id={post.id} className="addComment" onClick={addComment}>
            Post
          </button>
        </div>
      </div>
      <div className="closeButton" onClick={closePost}>
        X
      </div>
    </div>
  );
};

export default EnlargePost;
