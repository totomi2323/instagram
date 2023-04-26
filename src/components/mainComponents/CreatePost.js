import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import "../../styles/create.css";

const CreatePost = (props) => {
  const { profileData } = props;

  const [path, setPath] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    const uploadElement = document.querySelector("#uploadPicture");
    uploadElement.addEventListener("change", uploadPicture);
  }, []);

  const up = () => {
    saveImageMessage(path);
  };

  const descriptionListener = (e) => {
    setDescription(e.target.value);
  };
  const uploadPicture = (e) => {
    e.preventDefault();
    const imagePreview = document.querySelector("#imagePreview");

    let file = e.target.files[0];
    imagePreview.src = URL.createObjectURL(file);
    setPath(file);
  };
  let LOADING_IMAGE_URL = "https://www.google.com/images/spin-32.gif?a";

  async function saveImageMessage(file) {
    try {
      // 1 - We add a message with a loading icon that will get updated with the shared image.
      const messageRef = await addDoc(collection(getFirestore(), "posts"), {
        name: getAuth().currentUser.displayName,
        imageUrl: LOADING_IMAGE_URL,
        profilePicUrl: getAuth().currentUser.photoURL,
        timestamp: serverTimestamp(),
        description: description,
      });

      // 2 - Upload the image to Cloud Storage.
      const filePath = `${getAuth().currentUser.uid}/${messageRef.id}/${
        file.name
      }`;
      const newImageRef = ref(getStorage(), filePath);
      const fileSnapshot = await uploadBytesResumable(newImageRef, file);

      // 3 - Generate a public URL for the file.
      const publicImageUrl = await getDownloadURL(newImageRef);

      // 4 - Update the chat message placeholder with the image's URL.
      await updateDoc(messageRef, {
        imageUrl: publicImageUrl,
        storageUrl: fileSnapshot.metadata.fullPath,
      });
    } catch (error) {
      console.error(
        "There was an error uploading a file to Cloud Storage:",
        error
      );
    }
  }

  return (
    <div className="create">
      <h3 className="createHeader">Create New Post</h3>
      <img alt="" src="#" id="imagePreview" className="preview"></img>
      <div>
        <div className="userInfo"><img src={profileData.photoURL} className="userPics"></img><p className="bold">{profileData.name}</p></div>
        <form id="image-form" action="#">
          <textarea
            placeholder="Write a caption..."
            onChange={descriptionListener}
            id="description"
            title=" choose some files asd"
          ></textarea>
          <input type="file" accept="image/*" id="uploadPicture"></input>
        </form>
        <button onClick={up}>Post Picture</button>
      </div>
    </div>
  );
};

export default CreatePost;
