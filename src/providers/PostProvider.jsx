import React, { useState, useEffect, createContext } from "react";
import { firestore } from "../firebase";
import { collectAll } from "../utilities";

export const PostsContext = createContext();

const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);

  // let unsubscribeFromFirestore = null;

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
  const { children } = props;
  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  );
};

export default PostProvider;
