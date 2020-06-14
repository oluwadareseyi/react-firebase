import React, { Component } from "react";

import { firestore, auth } from "../firebase";

import Posts from "./Posts";
import { collectAll } from "../utilities";
import Authentication from "./Authentication";

class Application extends Component {
  state = {
    posts: [],
    user: null,
  };

  unsubscribeFromFirestore = null;
  unsubscribeFromAuth = null;

  componentDidMount = async () => {
    this.unsubscribeFromFirestore = firestore
      .collection("posts")
      .onSnapshot((snapshot) => {
        const posts = snapshot.docs.map(collectAll);
        this.setState({ posts });
      });

    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ user });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  };

  render() {
    const { posts, user } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={user} />
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
