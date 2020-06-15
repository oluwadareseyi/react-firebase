import React from "react";
import { render } from "react-dom";

import "./index.scss";

import Application from "./components/Application";
import PostProvider from "./providers/PostProvider";

render(
  <PostProvider>
    <Application />
  </PostProvider>,
  document.getElementById("root")
);
