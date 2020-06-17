import React, { useState, useEffect } from "react";

import Post from "./Post";

import Comments from "./Comments";
import { firestore } from "../firebase";
import { collectAll } from "../utilities";
import { withRouter } from "react-router-dom";

const PostPage = (props) => {
  const { params } = props.match;

  const getPostId = () => params.id;

  const getPostRef = () => firestore.doc(`posts/${getPostId()}`);

  const getCommentsRef = () => getPostRef().collection("comments");

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const unsubscribeFromPost = getPostRef().onSnapshot((snapshot) => {
      const post = collectAll(snapshot);
      setPost(post);
    });

    const unsubscribeFromComments = getCommentsRef().onSnapshot((snapshot) => {
      const comments = snapshot.docs.map(collectAll);
      setComments(comments);
    });

    return () => {
      unsubscribeFromPost();
      unsubscribeFromComments();
    };
  }, [getCommentsRef, getPostRef]);

  const createComment = (comment) => {
    getCommentsRef().add({
      ...comment,
    });
  };
  return (
    <section>
      {post && <Post {...post} />}
      <Comments comments={comments} onCreate={createComment} />
    </section>
  );
};

export default withRouter(PostPage);
