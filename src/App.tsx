import React from "react";
import "./App.css";

import Post from "./components/post";
import Posts from "./components/posts";
// import Posts from "./containers/posts";
// import PostForm from "./containers/post-form";

import Undo from "./containers/undo";

const App: React.FC = () => {
  return (
    <div className="App">
      <header>
        <h1>デモアプリ</h1>
      </header>
      <Undo />
      <div id="main">
        <Post from="宮田" contents="こんにちは改行はどうなるかな？" to="清水" />
      </div>
    </div>
  );
};

export default App;
