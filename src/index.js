import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.scss";

import Application from "./components/Application";
import PostProvider from "./providers/PostProvider";
import UserProvider from "./providers/UserProvider";

render(
  <BrowserRouter>
    <PostProvider>
      <UserProvider>
        <Application />
      </UserProvider>
    </PostProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
