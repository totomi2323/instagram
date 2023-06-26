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
  const [googleLogin, setGoogleLogin] = useState();
  const [profileData, setProfileData] = useState({});
  const [selectedUser, setSelectedUser] = useState();

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
      if (googleLogin) {
        authStateObserver();
      }
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route
            path=""
            element={
              <Login
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setGoogleLogin={setGoogleLogin}
                setProfileData={setProfileData}
              />
            }
          ></Route>
          <Route
            path="main"
            element={
              <Main
                isLoggedIn={isLoggedIn}
                profileData={profileData}
                setSelectedUser={setSelectedUser}

                setIsLoggedIn={setIsLoggedIn}
              />
            }
          >
            <Route
              path="home"
              element={
                <Home
                  profileData={profileData}
                />
              }
            ></Route>
            <Route
              path="profile"
              element={
                <Profile actualUser={profileData} showPostOf={profileData} />
              }
            ></Route>
            <Route
              path="user"
              element={
                <OtherProfile
                  showPostOf={selectedUser}
                  actualUser={profileData}
                  key={uniqid()}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
