import { Reducer } from 'redux'
import { PostAction, EMPATHY_SUCCEED } from '../actions/post'
import { PostProps } from '../../components/post'

export interface PostState {
  noStateNow: number
  posts: Array<PostProps>
}

export const initialState: PostState = {
  noStateNow: 0,
  posts: [],
}

const postReducer: Reducer<PostState, PostAction> = (
  state: PostState = initialState,
  action: PostAction
): PostState => {
  switch (action.type) {
    case EMPATHY_SUCCEED:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default postReducer
