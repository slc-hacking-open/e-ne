import React from "react";
import "./App.css";

import Post from "./containers/post";
import PostForm from "./containers/post-form";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Sample Application</h1>
      <div className="posts">
        <Post />
      </div>
      <PostForm />
    </div>
  );
};

export default App;
