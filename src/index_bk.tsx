import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import DispProfile from './containers/profile'

import App from './App'
import { reducer } from './store/store'
import * as serviceWorker from './serviceWorker'

import './index.css'
import { ProfileState } from './store/reducers/profile-reducer'

const store = createStore(reducer, applyMiddleware(thunk))

const profile: ProfileState = {
  user: { imageurl: '', name: '', profile: '', userid: '', department: '' },
  isLoading: false,
}

// const store = createStore(reducer, { profile })

ReactDOM.render(
  <Provider store={store}>
    <DispProfile />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
