import React, { useState, useEffect } from "react";
import NavBar from "./mainComponents/NavBar";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import Home from "./mainComponents/Home";
import CreatePost from "./mainComponents/CreatePost";
import uniqid from "uniqid";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
const Main = (props) => {
  const { isLoggedIn, profileData } = props;
  const [allUser, setAllUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const logProfileData = () => {
    console.log(profileData);
  };
  useEffect(() => {
    function loadUsersList() {
      const recentUsersQuery = query(collection(getFirestore(), "users"));
      onSnapshot(recentUsersQuery, function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "removed") {
          } else {
            var users = change.doc.data();
            setAllUser((prevState) => [...prevState, users]);
          }
        });
      });
    }
    return loadUsersList;
  }, []);

  const ShowUsers = () => {
     return (<div className="usersList">
      {Object.keys(allUser).map((user)=> {
        return(
          <div key={uniqid()} className="otherUser">
            <img className="otherUserImage" src={allUser[user].profileData.photoURL}></img>
            <p>{allUser[user].profileData.name}</p>
          </div>
        )
      })}
     </div>)
    
  };
  return (
    <div>
      <div className="main">
        <NavBar profileData={profileData} />
        <div className="center">
          <Outlet />
        </div>
        <div>
          <p>valami</p>
          <button onClick={logProfileData}>asd</button>
          <ShowUsers />
        </div>
      </div>
      <div className="createBox hidden">
        <CreatePost profileData={profileData} />
      </div>
    </div>
  );
};

export default Main;
