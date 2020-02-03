import React from "react";
import "./App.css";

import Posts from "./containers/posts";
import DispProfile from "./containers/profile";
import Loading from "./containers/loading";
import Message from "./containers/message";

const App: React.FC = () => {
  return (
    <div className="App">
      <Message />
      <header>
        <h1>デモアプリ</h1>
      </header>
      <div id="main">
        <Posts />
      </div>
      <div id="profile">
        <DispProfile />
      </div>
      <Loading />
    </div>
  );
};

export default App;
