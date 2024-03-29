import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "../../styles/create.css";
import toggleCreateBox from "../../functions/toggleCreateBox";

const CreatePost = (props) => {
  const { profileData, createInvisible, setCreateInvisible } =
    props;

  const [path, setPath] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    const uploadElement = document.querySelector("#selectPicture");
    uploadElement.addEventListener("change", selectPicture);
  }, []);

  const uploadPost = () => {
    saveImageMessage(path);
    toggleCreateBox(setCreateInvisible, createInvisible);
    setTimeout(function () {
    
    }, 2000);
  };

  const descriptionListener = (e) => {
    setDescription(e.target.value);
  };
  const selectPicture = (e) => {

    e.preventDefault();
    const imagePreview = document.querySelector("#imagePreview");
    let file = e.target.files[0];
      imagePreview.src = URL.createObjectURL(file);
      setPath(file);
      if (e.target.value) {
        document.querySelector(".postButton").classList.remove("hidden")
      }
    

  };
  let LOADING_IMAGE_URL = "https://www.google.com/images/spin-32.gif?a";


  async function saveImageMessage(file) {
    try {
      const messageRef = await addDoc(collection(getFirestore(), "posts"), {
        name: profileData.name,
        imageUrl: LOADING_IMAGE_URL,
        profilePicUrl: profileData.photoURL,
        timestamp: serverTimestamp(),
        postDate: new Date(),
        description: description,
        uploadedBy: profileData.UID,
      });

  

      const filePath = `${profileData.UID}/${profileData.name}/${
        file.name
      }`;
      const newImageRef = ref(getStorage(), filePath);
      const fileSnapshot = await uploadBytesResumable(newImageRef, file);
      const publicImageUrl = await getDownloadURL(newImageRef);

      await updateDoc(messageRef, {
        imageUrl: publicImageUrl,
        storageUrl: fileSnapshot.metadata.fullPath,
        id: messageRef.id,
      });
    } catch (error) {
      console.error(
        "There was an error uploading a file to Cloud Storage:",
        error
      );
    }
  }
  const selecFile = () => {
    document.getElementById("selectPicture").click();
  };

  return (
    <div className="create">
      <h3 className="createHeader">Create New Post</h3>
      <div className="createMain">
        <img alt="" src="#" id="imagePreview" className="preview"></img>
        <div className="photoInfo">
          <div className="userInfo">
            <img
              src={profileData.photoURL}
              className="userPics"
              alt="profile"
            ></img>
            <p className="bold">{profileData.name}</p>
          </div>

          <textarea
            placeholder="Write a caption..."
            onChange={descriptionListener}
            id="description"
            title=" choose some files asd"
          ></textarea>
          <div className="createButtonContainer">
            <input type="file" accept="image/*" id="selectPicture" ></input>
            <input
              type="button"
              value="Choose Picture"
              onClick={selecFile}
              className="instagramButton"
            />
            <button onClick={uploadPost} className="instagramButton postButton hidden" >
              Post Picture
            </button>
            <button
              onClick={() => {
                toggleCreateBox(setCreateInvisible, createInvisible) 
              }}
              className="instagramButton close"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
