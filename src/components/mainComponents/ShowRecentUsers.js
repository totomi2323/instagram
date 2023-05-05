
import uniqid from "uniqid";
import { Link } from "react-router-dom";

const ShowRecentUsers = (props) => {
    const {allUser, setSelectedUser} = props;


    const checkUser = (e) => {

      setSelectedUser(e.target.innerHTML)
    }

    return (<div className="usersList">
    {Object.keys(allUser).map((user)=> {
      return(
        
        <div className="otherUserContainer"  key={uniqid()}>
          <img className="otherUserImage" src={allUser[user].profileData.photoURL} alt="other user"></img>
          <Link to="user" >
          <p  onClick={checkUser}>{allUser[user].profileData.name}</p>
          </Link>
        </div>
     
      )
    })}
   </div>)
}

export default ShowRecentUsers;