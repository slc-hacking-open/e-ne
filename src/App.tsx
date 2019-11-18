import React from "react";
import "./App.css";

import Post from "./containers/post";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sample Application</h1>
      </header>
      <div>
        <Post />
      </div>
    </div>
  );
};

export default App;
