import React from "react";
import "./App.css";

import Posts from "./containers/posts";

const App: React.FC = () => {
  return (
    <div className="App">
      <header>
        <h1>デモアプリ</h1>
      </header>
      <div id="main">
        <Posts />
      </div>
    </div>
  );
};

export default App;
