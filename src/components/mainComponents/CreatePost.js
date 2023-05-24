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
import { getAuth } from "firebase/auth";
import "../../styles/create.css";
import { getFirebaseConfig } from "../../firebase-config";
import toggleCreateBox from "../../functions/toggleCreateBox";
import uniqid from "uniqid";

const CreatePost = (props) => {
  const { profileData, setHomeRefresh, createInvisible, setCreateInvisible } =
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
      setHomeRefresh(uniqid());
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
  };
  let LOADING_IMAGE_URL = "https://www.google.com/images/spin-32.gif?a";

  async function saveImageMessage(file) {
    try {
      const messageRef = await addDoc(collection(getFirestore(), "posts"), {
        name: getAuth().currentUser.displayName,
        imageUrl: LOADING_IMAGE_URL,
        profilePicUrl: getAuth().currentUser.photoURL,
        timestamp: serverTimestamp(),
        description: description,
        uploadedBy: profileData.UID,
      });

      const filePath = `${getAuth().currentUser.uid}/${profileData.name}/${
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
          <div>
            <input type="file" accept="image/*" id="selectPicture"></input>
            <input
              type="button"
              value="Choose Picture"
              onClick={selecFile}
              className="instagramButton"
            />
            <button onClick={uploadPost} className="instagramButton">
              Post Picture
            </button>
            <button
              onClick={() => {
                toggleCreateBox(setCreateInvisible, createInvisible);
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
