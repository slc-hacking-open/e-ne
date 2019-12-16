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
        <Posts
          posts={[
            { id: 0, from: "宮田", contents: "こんにちは", to: "清水" },
            { id: 1, from: "宮田", contents: "こんばんは", to: "田中" }
          ]}
        />
      </div>
    </div>
  );
};

export default App;
