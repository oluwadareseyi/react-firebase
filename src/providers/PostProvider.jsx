import React, { useState, useEffect, createContext } from "react";
import { firestore } from "../firebase";
import { collectAll } from "../utilities";

export const PostsContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribeFromFirestore = firestore
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const posts = snapshot.docs.map(collectAll);
        setPosts(posts);
      });

    return () => {
      unsubscribeFromFirestore();
    };
  }, []);

  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  );
};

export default PostProvider;
