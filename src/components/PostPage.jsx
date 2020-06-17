import React, { useState, useEffect } from "react";

import Post from "./Post";
import { withRouter } from "react-router-dom";

import Comments from "./Comments";
import { firestore } from "../firebase";
import { collectAll } from "../utilities";
import withUser from "./withUser";

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
  }, []);

  const createComment = (comment) => {
    const { user } = props;
    getCommentsRef().add({
      ...comment,
      user,
    });
  };

  return (
    <section>
      {post && <Post {...post} />}
      <Comments comments={comments} onCreate={createComment} />
    </section>
  );
};

export default withRouter(withUser(PostPage));
