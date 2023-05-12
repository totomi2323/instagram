import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  setDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import uniqid from "uniqid";

import DisplayPosts from "./DisplayPosts";
import "../../styles/home.css";

const Home = (props) => {
  const { profileData, setUserPosts } = props;
  const [posts, setPosts] = useState([]);

  const [fireStoreId, setFireStoreId] = useState();

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
          var message = change.doc.data();
          setPosts((prevState) => [...prevState, message]);
        }
      });
    });
    async function listener() {
      const querySnapshot = await getDocs(collection(getFirestore(), "posts"));
      querySnapshot.forEach((doc) => {
        setFireStoreId(doc.id);
      });
    }

    uploadUserInfo();
    return () => {
      listener();
      unsubcribe();
    };
  }, []);

  const addComment = async () => {
    const commentListener = document.querySelector(".commentInput");
    let comment = commentListener.value;
    let reference = commentListener.getAttribute(["data-id"]);
    console.log(reference);

    const commentReference = doc(getFirestore(), "posts", reference);

    let valami = { comment: comment, id: uniqid(), name: profileData.name };

    await updateDoc(commentReference, {
      comments: { [valami.id]: valami },
    });
  };

  useEffect(() => {
    setUserPosts([]);
    Object.keys(posts).map((post) => {
      if (posts[post].uploadedBy === profileData.UID) {
        setUserPosts((prevState) => [...prevState, posts[post]]);
      }
    });
  }, []);

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
  const logPosts = () => {
    console.log(posts);
  };

  return (
    <div className="homePage">
      <button onClick={logPosts}>click</button>
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
              </div>
              <img src={post.imageUrl} className="postPicture"></img>
              <p>{post.description}</p>
              <div className="comments" key={uniqid()}>
                {post.comments ? (
                  Object.keys(post.comments).map((com) => {
                    return (
                      <div className="comment" key={uniqid()}>
                        <p className="commentUser">
                          {post.comments[com].name} :
                        </p>
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
                ></input>
                <button onClick={addComment}>Add comment</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
