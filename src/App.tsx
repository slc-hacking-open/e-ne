import React from "react";
import "./App.css";

import Posts from "./containers/posts";
import Sender from "./containers/sender";

import Undo from "./containers/undo";

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
        <Sender />
      </div>
    </div>
  );
};

export default App;
