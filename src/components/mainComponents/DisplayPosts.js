import React, { useEffect, useState } from "react";
import uniqid from "uniqid";
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  addDoc,
  setDoc,
  set,
  update,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { list } from "firebase/storage";

const DisplayPosts = (props) => {
  const { posts } = props;

  const [comment, setComment] = useState("kokuszbogyo");
  const [fireStoreId, setFireStoreId] = useState();

  useEffect(() => {
    async function listener() {
      const querySnapshot = await getDocs(collection(getFirestore(), "posts"));
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        console.log(doc.id);
        setFireStoreId(doc.id);
      });
    }

  }, []);

  useEffect(() => {
    console.log(posts);
  }, []);

  function commentListener(e) {
    setComment(e.target.value);
    console.log(comment);
  }

  const addComment = async () => {
    const commentReference = doc(getFirestore(), "posts", fireStoreId);

    await updateDoc(commentReference, {
      comments: {
        comment: comment,
        name: "Tomi",
      },
    });
  };

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
              data-id={post.id}
              onChange={commentListener}
              value={comment}
            ></input>
            <button onClick={addComment}>Add comment</button>
          </div>
        </div>
      );
    });
    return element;
  };

  const displayAllPost = makePost();
 
};
export default DisplayPosts;
