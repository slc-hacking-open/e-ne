import { combineReducers } from 'redux'

import profileReducer from './reducers/profile-reducer'
import postReducer from './reducers/post-reducer'
import postsReducer from './reducers/posts-reducer'
import SenderReducer from './reducers/sender-reducer'
import LoadingReducer from './reducers/loading-reducer'
import MessageReducer from './reducers/message-reducer'

export const reducer = combineReducers({
  post: postReducer,
  posts: postsReducer,
  sender: SenderReducer,
  loading: LoadingReducer,
  message: MessageReducer,
  profile: profileReducer,
})

export type AppState = ReturnType<typeof reducer>
