import React from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import './Reset.css'
import './App.css'

import DispProfile from './containers/profile'
import Message from './containers/message'
import Posts from './containers/posts'
import Sender from './containers/sender'
import Loading from './containers/loading'
import { ReactComponent as Ene } from './ene.svg'

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

export default withAuthenticator(App)
