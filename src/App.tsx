import React, { useState } from 'react'
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignOut,
} from '@aws-amplify/ui-react'
import './Reset.css'
import './App.css'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'

import DispProfile from './containers/profile'
import Message from './containers/message'
import Posts from './containers/posts'
import Sender from './containers/sender'
import Loading from './containers/loading'
import { ReactComponent as Ene } from './ene.svg'

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>()
  const [user, setUser] = useState<boolean>(false)

  React.useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState)
      setUser(!!authData)
    })
  }, [])

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
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
    </div>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignIn slot="sign-in" hideSignUp />
    </AmplifyAuthenticator>
  )
}
export default App
