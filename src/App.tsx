import React from 'react'
import {
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifySignUp,
} from '@aws-amplify/ui-react'
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
      <AmplifyAuthenticator>
        <AmplifySignUp
          slot="sign-up"
          formFields={[
            { type: 'username', required: true },
            { type: 'email', required: true },
            { type: 'password', required: true },
          ]}
        />
        <Message />
        <header className="header">
          <Ene />
          <h1>e-ne</h1>
        </header>
        <div className="signout">
          <AmplifySignOut />
        </div>
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
      </AmplifyAuthenticator>
    </div>
  )
}
export default App
