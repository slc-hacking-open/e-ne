import React, { useState } from 'react'
import { AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react'
import './Reset.css'
import './App.css'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'

import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom'
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { ExitToApp, Home, Mail } from '@material-ui/icons'
import { Auth } from 'aws-amplify'
import DispProfile from './containers/profile'
import Message from './containers/message'
import Sender from './containers/sender'
import Loading from './containers/loading'
import { ReactComponent as Ene } from './ene.svg'
import ReceivePage from './pages/ReceivePage'
import HomePage from './pages/HomePage'

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
    <Router>
      <div className="App">
        <Message />
        <header className="header">
          <Ene />
          <h1>e-ne</h1>
        </header>
        <div className="main">
          <div className="main-toolbar">
            <List>
              <Divider />
              <Link to="/" className="link">
                <ListItem button>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="ホーム" />
                </ListItem>
              </Link>
              <Link to="/receive" className="link">
                <ListItem button>
                  <ListItemIcon>
                    <Mail />
                  </ListItemIcon>
                  <ListItemText primary="受信カード" />
                </ListItem>
              </Link>
              <Divider />
              <Link to="/" onClick={() => Auth.signOut()} className="link">
                <ListItem button>
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText primary="ログアウト" />
                </ListItem>
              </Link>
              <Divider />
            </List>
          </div>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/receive" component={ReceivePage} exact />
          </Switch>
        </div>
        <Loading />
      </div>
    </Router>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignIn slot="sign-in" hideSignUp />
    </AmplifyAuthenticator>
  )
}
export default App
