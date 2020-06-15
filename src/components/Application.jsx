import React, { Component } from "react";

import { auth, createUserDocument } from "../firebase";

import Posts from "./Posts";
import Authentication from "./Authentication";

class Application extends Component {
  state = {
    user: null,
  };

  unsubscribeFromAuth = null;

  componentDidMount = async () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      const user = await createUserDocument(userAuth);
      console.log(user);

      this.setState({ user });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  };

  render() {
    const { user } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={user} />
        <Posts />
      </main>
    );
  }
}

export default Application;
