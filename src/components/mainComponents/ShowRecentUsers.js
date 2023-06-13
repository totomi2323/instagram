import uniqid from "uniqid";
import { Link } from "react-router-dom";
import "../../styles/allUser.css";

const ShowRecentUsers = (props) => {
  const { allUser, setSelectedUser } = props;

  const checkUser = (e) => {
    
    allUser.map((user) => {
      if (e.target.innerHTML === user.profileData.name)
      setSelectedUser(user.profileData)
      console.log(allUser)
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
