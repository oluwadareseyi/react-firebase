import React, { useState, useRef } from "react";
import { auth, firestore, storage } from "../firebase";

const UserProfile = () => {
  const imageInputRef = useRef(null);
  const [displayName, setDisplayName] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setDisplayName(value);
  };

  const getUid = () => auth.currentUser.uid;
  const getUserRef = () => firestore.collection("users").doc(getUid());
  const getFile = () => imageInputRef.current && imageInputRef.current.files[0];

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (displayName) {
      getUserRef().update({
        displayName,
      });
    }

    if (getFile()) {
      const uploadTask = storage
        .ref()
        .child("user-profiles")
        .child(getUid())
        .child(getFile().name)
        .put(getFile());

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //takes a snap shot of the process as it is happening
          let getProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + getProgress + "% done");
        },

        (err) => {
          console.log(err);
        },
        async () => {
          const photoURL = await storage
            .ref()
            .child("user-profiles")
            .child(getUid())
            .child(getFile().name)
            .getDownloadURL();

          getUserRef().update({
            photoURL,
          });
        }
      );
    }

    setDisplayName("");
  };
  return (
    <section className="UserProfile">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="displayName"
          placeholder="Enter Display Name"
          onChange={handleChange}
          value={displayName}
        />
        <input type="file" name="imageInput" ref={imageInputRef} />
        <input className="update" type="submit" />
      </form>
    </section>
  );
};

export default UserProfile;
