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
        {/*
        <Posts
          posts={[
            { id: 0, from: "宮田", contents: "こんにちは", to: "清水" },
            { id: 1, from: "宮田", contents: "こんばんは", to: "田中" }
          ]}
        />
        */}
      </div>
    </div>
  );
};

export default App;
