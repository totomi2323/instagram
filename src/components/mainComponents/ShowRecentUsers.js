import uniqid from "uniqid";
import { Link } from "react-router-dom";
import "../../styles/allUser.css";
import { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";

const ShowRecentUsers = (props) => {
  const {  setSelectedUser } = props;

  const [allUser, setAllUser] = useState([])

  useEffect(()=> {

    const recentUsersQuery = query(collection(getFirestore(), "users"));
     const loadUsersList =  onSnapshot(recentUsersQuery, function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === "removed") {
          } else if (change.type === "added") {
            var users = change.doc.data();
            setAllUser((prevState) => [
              ...prevState,
              { profileData: users.profileData },
            ]);
          }
        });
      })
    return () => {loadUsersList();}
  }, [])


  const checkUser = (e) => {
    allUser.map((user) => {
      if (e.target.innerHTML === user.profileData.name)
      setSelectedUser(user.profileData)
    })
  };

  return (
    <div className="usersList">

      <p className="checkHeader">Check other people's profile:</p>
      <div className="userListContainer">
        {Object.keys(allUser).map((user) => {
          return (
            <div className="userContainer" key={uniqid()}>
              <img
                className="otherUserImage"
                src={allUser[user].profileData.photoURL}
                alt="other user"
                referrerPolicy="no-referrer"
              ></img>
              <Link to="user" className="user">
                <p onClick={checkUser}>{allUser[user].profileData.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowRecentUsers;
