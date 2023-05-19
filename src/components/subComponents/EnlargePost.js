import uniqid from "uniqid";
import likebutton from "../../pictures/svgs/heart-outline.svg";

const EnlargePost = (props) => {
  const { post } = props;

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
        <div className="postHeader">
          <img
            src={post.profilePicUrl}
            className="postUserPics"
            alt={post.name}
          ></img>
          <p className="bold">{post.name}</p>
        </div>
        <div className="postCommentContainer">
          {post.comments  ? (
            Object.keys(post.comments).map((com) => {
              return (
                <div  key={uniqid()}>
                  <p className="commentUser">{post.comments[com].name} :</p>
                  <p className="comment">{post.comments[com].comment}</p>
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
            ></img>
          ) : (
            <img
              src={likebutton}
              alt={"Like button"}
              className="likeButton"
              data-id={post.id}
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
          ></textarea>

          <button data-id={post.id} className="addComment">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnlargePost;
