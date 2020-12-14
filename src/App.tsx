import React from 'react'
import './Reset.css'
import './App.css'

import Posts from './containers/posts'
import DispProfile from './containers/profile'
import Loading from './containers/loading'
import Message from './containers/message'
import { ReactComponent as Ene } from './ene.svg'
import Sender from './containers/sender'

const App: React.FC = () => {
  return (
    <div className="App">
      <Message />
      <header className="header">
        <Ene />
        <h1>e-ne</h1>
      </header>
      <div className="main">
        <div className="main-contents">
          <Posts />
        </div>
        <div className="main-sidemenu">
          <DispProfile />
          <Sender />
        </div>
      </div>
      <Loading />
    </div>
  )
}

export default App
