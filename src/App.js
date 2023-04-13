import "./App.css";
import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./firebase-config";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./modules/Login";
import Main from "./modules/Main";
import { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

function App() {
  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);

  const [isLoggedIn, setIsLoggedIn] = useState();
  const [profilePicUrl, setProfilePicUrl] = useState("#");

  useEffect(() => {
    function getProfilePicUrl() {
      return getAuth().photoURL;
    }
   

    function authStateObserver(user) {
      if (user) {

        let sg = user.photoURL
        setProfilePicUrl(sg);
        console.log(sg)
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
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
