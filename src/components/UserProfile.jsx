import React, { useState, useRef } from "react";
import { auth, firestore, storage } from "../firebase";

const UserProfile = () => {
  const imageInputRef = useRef(null);
  const [displayName, setDisplayName] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setDisplayName(value);
  };

  // helper function to get th user ID.
  const getUid = () => auth.currentUser.uid;
  // helper function to get a reference to a user in the user collection using ths ID gotten.
  const getUserRef = () => firestore.collection("users").doc(getUid());
  // helper function to get the file the user wants to upload if a file exists, we get the first file;
  const getFile = () => imageInputRef.current && imageInputRef.current.files[0];

  const handleSubmit = async (event) => {
    event.preventDefault();

    // we check if there is a display name in the state, if yes, we update it, if no, we don't do anything.
    if (displayName) {
      getUserRef().update({
        displayName,
      });
    }

    if (
      /\.(jpe?g|png|gif)$/i.test(imageInputRef.current.files[0].name) === false
    ) {
      return alert("not an image!");
    }

    // we check if there is an actual file, returns the file as truthy if there is one.
    if (getFile()) {
      // we get/set the location where we want to upload the file in the storage bucket.
      const uploadLocation = storage
        .ref()
        .child("user-profiles")
        .child(getUid())
        .child(getFile().name);

      // we put the file in the upload location we got/set above.
      const uploadTask = uploadLocation.put(getFile());

      // we want to listen for changes to know the progress of our update (useful for things such as a progress bar)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //takes a snap shot of the process as it is happening and we calculate the file upload progress
          let getProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + getProgress + "% done");
        },

        (err) => {
          console.log(err);
        },
        // once the upload is done, the completed event fires
        async () => {
          // on completion, get the photoURL by calling the method on the download location
          const photoURL = await uploadLocation.getDownloadURL();

          // get the reference the the user and update the photoURL accordingly.
          getUserRef().update({
            photoURL,
          });
        }
      );
    }
    // clear the input and file states.
    setDisplayName("");
    imageInputRef.current.value = null;
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
        <input
          type="file"
          name="imageInput"
          ref={imageInputRef}
          accept="image/x-png,image/gif,image/jpeg"
        />
        <input className="update" type="submit" />
      </form>
    </section>
  );
};

export default UserProfile;
