import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Amplify from 'aws-amplify'
import App from './App'
import * as serviceWorker from './serviceWorker'

import './index.css'
import store from './store'

Amplify.configure({
  Auth: {
    // IDプールのID
    identityPoolId: '86a10237-d073-4d73-8872-cae12aa2c254',
    region: 'Ius-east-2',
    // ユーザープールのID
    userPoolId: 'us-east-2_4jNhofe8w',
    // アプリクライアントのID
    userPoolWebClientId: '46cai9allh85tv1vevg9rqs9v6',
  },
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
