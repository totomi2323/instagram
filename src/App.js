import "./App.css";
import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./firebase-config";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import Home from "./components/mainComponents/Home";
import CreatePost from "./components/mainComponents/CreatePost"
import Profile from "./components/mainComponents/Profile";


function App() {
  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);

  const [isLoggedIn, setIsLoggedIn] = useState();
  const [profilePicUrl, setProfilePicUrl] = useState("#");
  const [profileData, setProfileData] = useState({})

  useEffect(() => {
    function getProfilePicUrl() {
      return getAuth().photoURL;
    }

    function authStateObserver(user) {
      if (user) {
        let userPhoto = user.photoURL;
        let userName = user.displayName;
        let userID = user.uid;
        setProfilePicUrl(userPhoto);
        setProfileData({
          name: userName,
          photoURL: userPhoto,
          UID: userID,
        })
        
        //var userName = getUserName();
        // userNameElement.innerHTML = userName;
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
          <Route
            path="/"
            element={
              <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            }
          ></Route>
          <Route
            path="/main"
            element={
              <Main
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                profilePicUrl={profilePicUrl}
                profileData={profileData}
              />
            }
          >
            <Route path="home" element={<Home/>}></Route>
            <Route path="profile" element={<Profile/>}></Route>
            <Route path="create" element={<CreatePost/>} ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
