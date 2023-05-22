import uniqid from "uniqid";
import likebutton from "../../pictures/svgs/heart-outline.svg";
import { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  arrayUnion,
  updateDoc,
  serverTimestamp,
  arrayRemove,
} from "firebase/firestore";

const EnlargePost = (props) => {
  const { post, profileDetails, setPost, setProfileRefresh } = props;
 
  const [refresh,setRefresh] = useState()

  useEffect(() => {
    console.log(post);
  }, []);

  let commentValue = "";
  const commentListener = (e) => {
    commentValue = e.target.value;
    console.log(commentValue);
  };

  const addComment = async (e) => {
    let reference = e.target.getAttribute(["data-id"]);
    const commentReference = doc(getFirestore(), "posts", reference);
    let comment = {
      comment: commentValue,
      id: uniqid(),
      name: profileDetails.name,
    };

    let commentsArray = [];
    if (post.comments)  {
      commentsArray = post.comments
    } 
   setPost({...post, comments:[...commentsArray, comment]})

    await updateDoc(commentReference, { comments: arrayUnion(comment) });
    setRefresh(uniqid())
    document.querySelector(".commentInput").value = "" ;
  };

  const closePost = () => {
    let postElement = document.querySelector(".enlargedPost");
    postElement.style.visibility = "hidden";
    setProfileRefresh(uniqid())
  };

  const likeButtonEvent = async (e) => {
    let postReference = e.target.getAttribute(["data-id"]);
    let check = e.target.classList.contains("liked");
    const likeReferenceForPost = doc(getFirestore(), "posts", postReference);
    const likeReferenceForUser = doc(
      getFirestore(),
      "users",
      profileDetails.UID
    );

    if (check) {
      await updateDoc(likeReferenceForPost, {
        likes: arrayRemove(profileDetails.UID),
      });
      await updateDoc(likeReferenceForUser, {
        liked: arrayRemove(postReference),
      });
      e.target.classList.toggle("liked");
      post.likes.pop()
      setRefresh(uniqid())
    } else {
      await updateDoc(likeReferenceForPost, {
        likes: arrayUnion(profileDetails.UID),
      });
      await updateDoc(likeReferenceForUser, {
        liked: arrayUnion(postReference),
      });
      e.target.classList.toggle("liked");
      post.likes.push("like")
      setRefresh(uniqid())
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
      <div
        className="postInfoContainer"
        onClick={() => {
          console.log(post);
        }}
      >
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
        </div>
        <div className="addCommentContainer">
          <textarea
            placeholder="Add comment..."
            className="commentInput"
            onChange={commentListener}
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
