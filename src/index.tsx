import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Amplify, { I18n } from 'aws-amplify'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './index.css'
import store from './store'
import awsconfig, { dict } from './aws-exports'

Amplify.configure(awsconfig)

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

I18n.putVocabularies(dict)
I18n.setLanguage('ja')
