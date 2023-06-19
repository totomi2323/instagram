import React, { useState, useEffect } from "react";
import NavBar from "./mainComponents/NavBar";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import CreatePost from "./mainComponents/CreatePost";
import ShowRecentUsers from "./mainComponents/ShowRecentUsers";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const Main = (props) => {
  const { isLoggedIn, profileData, setSelectedUser, setHomeRefresh , setIsLoggedIn} = props;

  const [createInvisible, setCreateInvisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    uploadUserInfo();
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
  return (
    <div className="mainContainer">
      <div className="main">
        <NavBar
          profileData={profileData}
          createInvisible={createInvisible}
          setCreateInvisible={setCreateInvisible}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Outlet />
        <ShowRecentUsers  setSelectedUser={setSelectedUser} />
      </div>
      <div className="createBox hidden">
        <CreatePost
          profileData={profileData}
          setHomeRefresh={setHomeRefresh}
          createInvisible={createInvisible}
          setCreateInvisible={setCreateInvisible}
        />
      </div>
    </div>
  );
};

export default Main;
