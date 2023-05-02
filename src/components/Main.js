import React, { useState, useEffect } from "react";
import NavBar from "./mainComponents/NavBar";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import Home from "./mainComponents/Home";
import CreatePost from "./mainComponents/CreatePost";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
const Main = (props) => {
  const { isLoggedIn, profileData } = props;
  const [userSideBar, setUserSideBar] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  const logProfileData = () => {
    console.log(profileData);
    console.log(userSideBar);
  };
  useEffect(() => {
    function loadUsersList() {
      const recentUsersQuery = query(
        collection(getFirestore(), "users"),
      );
      onSnapshot(recentUsersQuery, function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "removed") {
          } else {
            console.log(users)
            var users = change.doc.data();
            setUserSideBar((prevState) => [...prevState, users]);
          }
        });
      });
    }
    return loadUsersList;
  }, []);


  return (
    <div>
      <div className="main">
        <NavBar profileData={profileData} />
        <div>
          <Outlet />
        </div>
        <div>
          <p>valami</p>
          <button onClick={logProfileData}>asd</button>
        </div>
      </div>
      <div className="createBox hidden">
        <CreatePost profileData={profileData} />
      </div>
    </div>
  );
};

export default Main;
