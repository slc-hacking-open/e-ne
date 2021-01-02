import { combineReducers } from '@reduxjs/toolkit'
import profileSlice from './profile/slice'
import senderSlice from './sender/slice'
import postsSlice from './posts/slice'
import postSlice from './post/slice'

const rootReducer = combineReducers({
  post: postSlice,
  posts: postsSlice,
  sender: senderSlice,
  profile: profileSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
