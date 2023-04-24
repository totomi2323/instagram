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
import "../../styles/home.css"

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    function loadMessages() {
      const recentMessagesQuery = query(collection(getFirestore(), "userId"));

      // Start listening to the query.
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
    console.log(posts)
    return ( loadMessages)
  }, []);

  const logPosts = () => {
    console.log(posts);
  };

  return (
    <div className="homePage">
      <p>It's Home Page</p>
      <button onClick={logPosts}>click</button>
      <DisplayPosts posts={posts} />
    </div>
  );
};

export default Home;
