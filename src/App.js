import "./App.css";
import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./firebase-config";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "./components/mainComponents/Home";
import Profile from "./components/mainComponents/Profile";
import OtherProfile from "./components/mainComponents/OtherProfile";
import uniqid from "uniqid";


function App() {
  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);

  const [isLoggedIn, setIsLoggedIn] = useState();
  const [profileData, setProfileData] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [homeRefresh, setHomeRefresh] = useState("key")

  useEffect(() => {
    function authStateObserver(user) {
      if (user) {
        setProfileData({
          name: user.displayName,
          photoURL: user.photoURL,
          UID: user.uid,
        });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
    function initFirebaseAuth() {
      onAuthStateChanged(getAuth(), authStateObserver);
    }
    initFirebaseAuth();

    return () => {
      authStateObserver();
    };
  }, []);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login isLoggedIn={isLoggedIn} />}></Route>
          <Route
            path="/main"
            element={
              <Main
                isLoggedIn={isLoggedIn}
                profileData={profileData}
                setSelectedUser={setSelectedUser}
                setHomeRefresh={setHomeRefresh}
              />
            }
          >
            <Route
              path="home"
              element={
                <Home profileData={profileData} setUserPosts={setUserPosts} key={homeRefresh} setHomeRefresh={setHomeRefresh} />
              }
            ></Route>
            <Route
              path="profile"
              element={
                <Profile profileData={profileData} userPosts={userPosts}  user={profileData}/>
              }
            ></Route>
            <Route path="user" element={<OtherProfile  user={selectedUser}  key={uniqid()} /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
