import "./App.css";
import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from "./firebase-config";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
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

  useEffect(() => {
    function authStateObserver(user) {
      if (user) {
       // var profilePicUrl = getProfilePicUrl();
        //var userName = getUserName();
       // userNameElement.innerHTML = userName;
       setIsLoggedIn(true)
      } else {
       setIsLoggedIn(false)
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
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>}></Route>
          <Route path="/main" element={<Main setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
