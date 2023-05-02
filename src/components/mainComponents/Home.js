import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import DisplayPosts from "./DisplayPosts";
import "../../styles/home.css";

const Home = (props) => {
  const { profileData } = props;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    function loadPosts() {
      const recentMessagesQuery = query(
        collection(getFirestore(), "posts"),
        orderBy("timestamp", "desc")
      );
      onSnapshot(recentMessagesQuery, function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "removed") {
          } else {
            var message = change.doc.data();
            setPosts((prevState) => [...prevState, message]);
          }
        });
      });
    }
    uploadUserInfo();

    return loadPosts;
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
      <DisplayPosts posts={posts} />
    </div>
  );
};

export default Home;
