import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Amplify, { I18n } from 'aws-amplify'
import App from './App'
import * as serviceWorker from './serviceWorker'

import './index.css'
import store from './store'
import { BASE_URL_USER } from './services/config'

Amplify.configure({
  Auth: {
    // リージョン
    region: 'ap-northeast-1',
    // ユーザープールのID
    userPoolId: 'ap-northeast-1_WknqfDlDy',
    // アプリクライアントのID
    userPoolWebClientId: '13nlcp3ai1j7383ap1qqtr3uo5',
    // IDプールのID
    identityPoolId: 'ap-northeast-1:7d67cedd-d0fd-4176-a663-db5c5ff4a9df',
  },
  API: {
    endpoints: [
      {
        name: 'getUserProfile',
        endpoint: `${BASE_URL_USER}`,
        region: 'ap-northeast-1',
      },
    ],
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

const dict = {
  ja: {
    'Sign In': 'サインイン ',
    'Sign Up': '登録 ',
    'Sign Out': 'サインアウト ',
    'Sign in to your account': 'アカウントにサインイン ',
    Username: 'ユーザー名 ',
    'Username *': 'ユーザー名（必須）',
    Password: 'パスワード ',
    'Password *': 'パスワード（必須）',
    'Enter your username': 'ユーザー名を入力 ',
    'Enter your password': 'パスワードを入力 ',
    'No account?': 'アカウントを持っていない場合 ',
    'Forgot your password?': 'パスワードを忘れた場合',
    'Reset password': 'パスワードをリセット ',
    'User does not exist': 'ユーザーが存在しません ',
    'User already exists': '既にユーザーが存在しています ',
    'Incorrect username or password': 'ユーザー名かパスワードが異なります ',
    'Invalid password format': 'パスワードの形式が無効です ',
    'Create account': 'アカウントを作る ',
    'Forgot Password': 'パスワードを忘れた ',
    'Change Password': 'パスワードを変える ',
    'New Password': '新しいパスワード',
    Email: 'メールアドレス',
    'Email Address *': 'メールアドレス（必須）',
    'Enter your email address': 'メールアドレスを入力',
    'Phone Number': '電話番号',
    'Confirm a Code': 'コードを確認',
    'Confirm Sign In': 'サインインする',
    'Confirm Sign Up': '登録する',
    'Back to Sign In': 'サインインに戻る',
    'Send Code': 'コードを送信',
    Confirm: '確定',
    'Resend Code': 'コードを再送信',
    Submit: '送信',
    Skip: 'スキップ',
    Verify: '確認',
    'Verify Contact': '連絡先を確認',
    Code: 'コード',
    'Confirmation Code': '確認コード',
    'Lost your code? ': 'コードを失くしましたか？',
    'Account recovery requires verified contact information':
      'アカウントの復旧には確認済みの連絡先が必要です',
    'Invalid phone number format':
      '不正な電話番号の形式です。\n+12345678900 の形式で入力してください',
    'Create Account': 'アカウントを作る',
    'Have an account?': 'アカウントをお持ちの場合',
    'Sign in': 'サインイン',
    'Create a new account': '新しいアカウントを作る',
    'Reset your password': 'パスワードをリセットする',
    'An account with the given email already exists.':
      '入力されたメールアドレスのアカウントが既に存在します',
    'Username cannot be empty': 'ユーザー名は入力必須です',
    'Password attempts exceeded': 'サインインの試行回数が上限に達しました',
    'Sign In with Google': 'Googleでサインイン',
    'Sign In with Facebook': 'Facebookでサインイン',
  },
}

I18n.putVocabularies(dict)
I18n.setLanguage('ja')
