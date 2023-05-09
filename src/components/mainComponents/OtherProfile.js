import { useEffect , useState} from "react";
import {
    getFirestore,
    collection,
    query,
    orderBy,
    onSnapshot,
    setDoc,
    doc,
  } from "firebase/firestore";
  import ProfileView from "../subComponents/ProfileView";
  
const OtherProfile = (props) => {
    const {selectedUser} = props;

    const [posts, setPosts] = useState([])
    const [profileData, setProfileData] = useState (false)
    
    const logPost = () => {
        console.log(posts)
        console.log(profileData)
    }
   

    useEffect(() => {
        function loadPosts() {
          setPosts([])
          const recentMessagesQuery = query(
            collection(getFirestore(), "posts"),
            orderBy("timestamp", "desc")
          );
          onSnapshot(recentMessagesQuery, function (snapshot) {
            snapshot.docChanges().forEach(function (change) {
              if (change.type === "removed") {
              } else {
                var message = change.doc.data();
                if (message.name === selectedUser) {
                    setPosts((prevState) => [...prevState, message]);
                  if (profileData === false) {
                    setProfileData({name: message.name, photoURL: message.profilePicUrl})
                  }
                }
              }
            });
          });
          console.log(selectedUser)
        }
        return () => {loadPosts()};
      }, [selectedUser]);

    return (
       <div className="profilePage">
         <button onClick={logPost}>log</button>
         <ProfileView  userPosts={posts} profileDetails={profileData}  />
       </div>
    )
}

export default OtherProfile;