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
  
const OtherProfile = (props) => {
    const {selectedUser} = props;

    const [posts, setPosts] = useState([])
    
    const logPost = () => {
        console.log(posts)
    }

    useEffect(() => {
        function loadPosts() {
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
                }
              }
            });
          });
        }
        return () => {loadPosts()};
      }, [selectedUser]);
    return (
       <div>
         <button onClick={logPost}>log</button>
       </div>
    )
}

export default OtherProfile;