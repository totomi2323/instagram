import React, { useState, useEffect } from "react";
import NavBar from "./mainComponents/NavBar";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import CreatePost from "./mainComponents/CreatePost";
import ShowRecentUsers from "./mainComponents/ShowRecentUsers";


import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
const Main = (props) => {
  const { isLoggedIn, profileData , setSelectedUser, setHomeRefresh} = props;
  const [allUser, setAllUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);


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

  return (
    <div>
      <div className="main">
        <NavBar profileData={profileData} />
        <div className="center">
          <Outlet />
        </div>
        <ShowRecentUsers allUser={allUser} setSelectedUser={setSelectedUser} />
      </div>
      <div className="createBox hidden">
        <CreatePost profileData={profileData} setHomeRefresh={setHomeRefresh}/>
      </div>
    </div>
  );
};

export default Main;
