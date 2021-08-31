import { combineReducers } from '@reduxjs/toolkit'
import profileSlice from './profile/slice'
import senderSlice from './sender/slice'
import postsSlice from './posts/slice'

const rootReducer = combineReducers({
  posts: postsSlice,
  sender: senderSlice,
  profile: profileSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
