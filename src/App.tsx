import React from "react";
import "./App.css";

import { Route } from "react-router";
import Posts from "./containers/posts";
import PostForm from "./containers/post-form";

import Undo from "./containers/undo";
// import DispProfile from "./containers/profile";
import DispProfile from "./containers/profile-thunk";

const App: React.FC = () => {
  return (
    <div className="App">
      <header>
        <h1>デモアプリ</h1>
      </header>
      <Undo />
      <div id="main">
        <div id="posts">
          <Posts />
        </div>
        <Route path="/" component={DispProfile} />
        <PostForm />
      </div>
    </div>
  );
};

export default App;
