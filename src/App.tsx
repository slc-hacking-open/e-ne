import React from "react";
import "./App.css";

import Post from "./containers/post";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Sample Application</h1>
      <div>
        <Post />
      </div>
    </div>
  );
};

export default App;
