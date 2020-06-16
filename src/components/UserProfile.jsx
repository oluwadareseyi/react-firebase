import React, { useState, useRef } from "react";
import { auth, firestore } from "../firebase";

const UserProfile = () => {
  const imageInputRef = useRef(null);
  const [displayName, setDisplayName] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    setDisplayName(value);
  };

  const getUid = () => auth.currentUser.uid;
  const getUserRef = () => firestore.collection("users").doc(getUid());

  const handleSubmit = (event) => {
    event.preventDefault();

    if (displayName) {
      getUserRef().update({
        displayName,
      });
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
