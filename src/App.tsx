import React from "react";
import "./App.css";

import Posts from "./containers/posts";
import PostForm from "./containers/post-form";

const App: React.FC = () => {
  return (
    <div className="App">
      <header>
        <h1>デモアプリ</h1>
      </header>
      <div id="main">
        <div id="posts">
          <Posts />
        </div>
        <PostForm />
      </div>
    </div>
  );
};

export default App;
