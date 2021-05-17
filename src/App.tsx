/* eslint-disable react/no-array-index-key */
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
import { ExitToApp } from '@material-ui/icons'
import { Auth } from 'aws-amplify'
import Message from './containers/message'
import Loading from './containers/loading'
import Header from './Header'
import routes from './routes'

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
        <Header />
        <div className="main">
          <div className="main-sidebar">
            <List>
              <Divider />
              {routes.map((route, index) => (
                <Link to={route.path} className="link" key={index}>
                  <ListItem button>
                    <ListItemIcon>{route.linkIcon}</ListItemIcon>
                    <ListItemText primary={route.name} />
                  </ListItem>
                </Link>
              ))}
              <Divider />
              <Link to="/" onClick={() => Auth.signOut()} className="link">
                <ListItem button>
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText primary="サインアウト" />
                </ListItem>
              </Link>
              <Divider />
            </List>
          </div>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                component={route.component}
                exact
              />
            ))}
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
