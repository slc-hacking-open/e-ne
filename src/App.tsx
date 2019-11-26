import React from "react";
import "./App.css";

import Posts from "./containers/posts";
import PostForm from "./containers/post-form";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Sample Application</h1>
      <div className="posts">
        <Posts />
      </div>
      <PostForm />
    </div>
  );
};

export default App;
