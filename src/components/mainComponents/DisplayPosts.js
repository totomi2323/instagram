import React from "react";
import uniqid from "uniqid";

const DisplayPosts = (props) => {
  const { posts } = props;


  const makePost = () => {
    const element = [];

    posts.map((post) => {
      element.push(
        <div className="post" key={uniqid()}>
          <div className="postHeader">
            <img
              src={post.profilePicUrl}
              alt="userImage"
              className="userPics"
            ></img>
            <p>{post.name}</p>
          </div>

          <img src={post.imageUrl} className="postPicture"></img>
          <p>{post.description}</p>
          <div className="comments" key={uniqid()}>
            {post.comments ? (
              Object.keys(post.comments).map((com) => {
                return (
                  <div className="comment" key={uniqid()}>
                    <p className="commentUser">{post.comments[com].user} :</p>
                    <p className="comment">{post.comments[com].comment}</p>
                  </div>
                );
              })
            ) : (
              <></>
            )}
            <input
              type="text"
              placeholder="Add comment..."
              className="commentInput"
            ></input>
          </div>
        </div>
      );
    });

    return element;
  };

  const displayAllPost = makePost();

  return displayAllPost;
};

export default DisplayPosts;
